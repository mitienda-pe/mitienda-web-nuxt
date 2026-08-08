import type { Ref } from 'vue'

export interface BlogSearchEntry {
  path: string
  title: string
  description: string
  date: string
  image?: string
  tags: string[]
  countries: string[]
  /** Subtítulos del artículo, solo para hacer match. */
  headings: string
  /** Inicio del artículo en texto plano; de aquí sale el fragmento que se muestra. */
  text: string
}

export interface SnippetPart {
  text: string
  match: boolean
}

export interface BlogSearchHit extends BlogSearchEntry {
  score: number
  snippet: SnippetPart[] | null
}

/** Menos de 2 caracteres devuelve demasiado ruido para valer la pena. */
export const MIN_QUERY_LENGTH = 2

const WEIGHTS = { title: 12, tags: 8, headings: 6, description: 5, text: 2 }

const SNIPPET_RADIUS = 80

/**
 * Minúsculas y sin tildes, conservando la longitud original para que los
 * índices del texto normalizado sigan sirviendo sobre el texto original
 * (necesario para recortar y resaltar el fragmento).
 */
function fold(input: string): string {
  let out = ''
  for (const char of input) {
    const stripped = char.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    out += stripped.length === char.length ? stripped : char
  }
  return out.toLowerCase()
}

export function tokenizeQuery(query: string): string[] {
  return fold(query).split(/\s+/).filter(token => token.length > 0)
}

function buildSnippet(text: string, folded: string, tokens: string[]): SnippetPart[] | null {
  const hits: Array<[number, number]> = []
  for (const token of tokens) {
    let from = 0
    let at = folded.indexOf(token, from)
    while (at !== -1) {
      hits.push([at, at + token.length])
      from = at + token.length
      at = folded.indexOf(token, from)
    }
  }
  if (hits.length === 0) return null

  hits.sort((a, b) => a[0] - b[0])

  // Ventana alrededor de la primera coincidencia, recortada a límites de palabra.
  const [firstStart, firstEnd] = hits[0]!
  let start = Math.max(0, firstStart - SNIPPET_RADIUS)
  let end = Math.min(text.length, firstEnd + SNIPPET_RADIUS)
  if (start > 0) {
    const space = text.indexOf(' ', start)
    if (space !== -1 && space < firstStart) start = space + 1
  }
  if (end < text.length) {
    const space = text.lastIndexOf(' ', end)
    if (space !== -1 && space > firstEnd) end = space
  }

  const parts: SnippetPart[] = []
  let cursor = start
  for (const [hitStart, hitEnd] of hits) {
    if (hitEnd <= cursor || hitStart >= end) continue
    if (hitStart > cursor) {
      parts.push({ text: text.slice(cursor, hitStart), match: false })
    }
    parts.push({ text: text.slice(Math.max(hitStart, cursor), Math.min(hitEnd, end)), match: true })
    cursor = Math.min(hitEnd, end)
  }
  if (cursor < end) {
    parts.push({ text: text.slice(cursor, end), match: false })
  }

  if (start > 0 && parts[0]) parts[0] = { ...parts[0], text: `…${parts[0].text}` }
  if (end < text.length && parts.length) {
    const last = parts[parts.length - 1]!
    parts[parts.length - 1] = { ...last, text: `${last.text}…` }
  }

  return parts
}

/**
 * Búsqueda del blog: todos los términos deben aparecer (AND), el puntaje
 * depende del campo donde caiga cada término y los empates se resuelven por
 * fecha de publicación.
 */
export function useBlogSearch(entries: Ref<BlogSearchEntry[]>, query: Ref<string>) {
  const tokens = computed(() => tokenizeQuery(query.value))

  const isSearching = computed(() =>
    query.value.trim().length >= MIN_QUERY_LENGTH && tokens.value.length > 0
  )

  const results = computed<BlogSearchHit[]>(() => {
    if (!isSearching.value) return []

    const hits: BlogSearchHit[] = []

    for (const entry of entries.value) {
      const haystacks: Array<[string, number]> = [
        [fold(entry.title), WEIGHTS.title],
        [fold(entry.tags.join(' ')), WEIGHTS.tags],
        [fold(entry.headings), WEIGHTS.headings],
        [fold(entry.description), WEIGHTS.description],
      ]
      const foldedText = fold(entry.text)

      let score = 0
      let matchesAll = true

      for (const token of tokens.value) {
        let best = 0
        for (const [haystack, weight] of haystacks) {
          if (weight > best && haystack.includes(token)) best = weight
        }
        if (best === 0 && foldedText.includes(token)) best = WEIGHTS.text
        if (best === 0) {
          matchesAll = false
          break
        }
        score += best
      }

      if (!matchesAll) continue

      hits.push({
        ...entry,
        score,
        snippet: buildSnippet(entry.text, foldedText, tokens.value),
      })
    }

    return hits.sort((a, b) =>
      b.score - a.score || (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)
    )
  })

  return { isSearching, results }
}
