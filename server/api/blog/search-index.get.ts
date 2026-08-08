import { queryCollection } from '@nuxt/content/server'

/**
 * Índice liviano para el buscador del blog.
 *
 * El listado de /blog solo trae metadatos (title, description, tags), así que
 * para buscar dentro del artículo hace falta el texto. Enviar los 89 cuerpos
 * completos serían ~900 KB, por eso aquí se recorta: se conservan todos los
 * subtítulos (que resumen bien de qué trata cada sección) más los primeros
 * TEXT_BUDGET caracteres de prosa. El resultado ronda los 100 KB (~25 KB con
 * el gzip de Caddy) y se descarga una sola vez, cuando el usuario busca.
 */

const TEXT_BUDGET = 1600

/** Etiquetas cuyo contenido no aporta al texto buscable. */
const SKIPPED_TAGS = new Set(['code', 'pre', 'script', 'style', 'img', 'figure'])
const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4'])

/**
 * Nodo del AST "minimark" de Nuxt Content v3: o es texto plano, o es una
 * tupla [tag, props, ...hijos].
 */
type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

function collectText(nodes: MinimarkNode[], headings: string[], prose: string[]) {
  for (const node of nodes) {
    if (typeof node === 'string') {
      prose.push(node)
      continue
    }
    if (!Array.isArray(node)) continue

    const [tag, , ...children] = node
    if (SKIPPED_TAGS.has(tag)) continue

    if (HEADING_TAGS.has(tag)) {
      const parts: string[] = []
      collectText(children, [], parts)
      const heading = parts.join(' ').replace(/\s+/g, ' ').trim()
      if (heading) headings.push(heading)
      continue
    }

    collectText(children, headings, prose)
  }
}

/**
 * Subtítulos y prosa van por separado: ambos se buscan, pero el fragmento que
 * se muestra bajo el título se arma solo con la prosa (un extracto hecho de
 * subtítulos encadenados se lee como una lista de títulos, no como contexto).
 */
function buildSearchText(body: unknown): { headings: string, text: string } {
  const value = (body as { value?: MinimarkNode[] } | null)?.value
  if (!Array.isArray(value)) return { headings: '', text: '' }

  const headings: string[] = []
  const prose: string[] = []
  collectText(value, headings, prose)

  return {
    headings: headings.join(' · '),
    text: prose.join(' ').replace(/\s+/g, ' ').trim().slice(0, TEXT_BUDGET),
  }
}

export default defineCachedEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .order('date', 'DESC')
    .all()

  return {
    posts: posts.map(post => ({
      path: post.path,
      title: post.title,
      description: post.description,
      date: post.date,
      image: post.image,
      tags: post.tags || [],
      countries: post.countries || [],
      ...buildSearchText(post.body),
    })),
  }
}, {
  // El contenido solo cambia con un deploy, así que el índice puede vivir
  // en caché todo lo que dure el proceso.
  name: 'blog-search-index',
  getKey: () => 'v1',
  maxAge: 60 * 60 * 24,
  swr: true,
})
