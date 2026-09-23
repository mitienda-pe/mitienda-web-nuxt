# Sistema de plantillas visuales para infografías sociales

Referencia compartida por las tareas programadas `mitienda-blog-diario` y `mitienda-redes-backfill`.

**Problema que resuelve:** entre julio y septiembre de 2026 todas las infografías salieron con la misma diagramación (lista numerada vertical), el mismo personaje (mujer joven con lentes y mandil teal saludando) y la misma paleta. El feed se volvió indistinguible: un usuario que hace scroll no percibe que hay contenido nuevo.

---

## Cómo elegir la plantilla

**Regla automática (por defecto).** Cuenta los objetos `*-mitienda.jpg` en el bucket R2 `mitiendape`, prefijo `blog/social/`, con `mcp__cloudflare-r2__list_objects`. Sea `N` ese total:

```
plantilla = (N mod 6) + 1
```

Esto reparte las seis plantillas de forma pareja y determinista, sin necesidad de llevar registro aparte.

**Excepción por afinidad de contenido.** Si el artículo encaja claramente mejor con otra plantilla, úsala y anótalo en el reporte. Guía rápida:

| Si el artículo… | Usa |
|---|---|
| compara dos opciones o corrige errores frecuentes | 3 · CONTRASTE |
| describe un proceso con pasos en orden | 4 · FLUJO |
| gira alrededor de una sola idea o cifra fuerte | 2 · DATO |
| es una guía de verificación previa a hacer algo | 6 · CHECKLIST |
| trata de un nicho concreto (moda, comida, mascotas) | 5 · ESCENA |

**Regla dura:** nunca uses la misma plantilla dos corridas seguidas. Si la fórmula te devuelve la misma que la última vez, avanza a la siguiente.

---

## Paleta

Tres variantes dentro del sistema de marca. Rota también: `paleta = (N mod 3) + 1`.

- **A · Teal sobre crema** — fondo `#FBF7EF`, teal `#00B2A6` y teal profundo `#007D74` para bloques y titulares, navy `#293F54` para cuerpo, menta pálido `#D6F2EF` para bloques claros. Mostaza solo como acento mínimo.
- **B · Crema y navy** — fondo `#FBF7EF`, navy `#293F54` dominante en titulares y bloques, teal `#00B2A6` reservado para el elemento que más importa (la cifra, el ✅, el paso final). Más sobria, buena para temas de dinero y métricas.
- **C · Teal profundo invertido** — fondo teal profundo `#007D74`, texto crema `#FBF7EF`, bloques en teal `#00B2A6` y menta `#D6F2EF`. Alto contraste, destaca mucho en el feed. Úsala para temas de urgencia o campañas.

En las tres: nada de naranja, rojo ni azul saturado.

---

## Las seis plantillas

Todas en `size: 2:3` con gpt-image-1.5, y todas deben dejar **el 25% inferior completamente vacío** con el color de fondo, sin elementos, para que `social-image.php --layout=poster` recorte a 4:5 y estampe el logo.

### 1 · LISTA
Paneles redondeados numerados en vertical, cada uno con un ícono doodle y una etiqueta de 2–4 palabras. 5 o 6 ítems. **Sin personaje.** Es la plantilla que veníamos usando, ahora despojada del personaje fijo.

### 2 · DATO
Una sola afirmación o cifra ocupando el tercio central en tipografía enorme dibujada a mano. Encima, una línea de contexto pequeña; debajo, dos o tres frases cortas separadas por viñetas simples. Mucho aire. Sin paneles. Un único elemento gráfico grande (una lupa, una moneda, un carrito) como fondo tenue detrás del número.

### 3 · CONTRASTE
División vertical en dos columnas. Izquierda encabezada por ❌ con 3 ítems de lo que no funciona; derecha encabezada por ✅ con los 3 equivalentes que sí. Una línea divisoria dibujada a mano. Titular arriba, cruzando ambas columnas.

### 4 · FLUJO
Diagrama de 4 o 5 pasos conectados por flechas dibujadas a mano, serpenteando de arriba hacia abajo (zigzag, no lista recta). Cada paso es un círculo o rectángulo redondeado con un número grande, un ícono y dos o tres palabras. Se ve como un mapa, no como una lista.

### 5 · ESCENA
Ilustración narrativa de una situación real de comercio: alguien empacando un pedido en su sala, un puesto de mercado con un cartel de QR, un celular sobre un mostrador con notificaciones de venta, cajas listas para despacho. El titular va superpuesto en la parte superior sobre un bloque de color. Máximo dos etiquetas cortas.

**Esta es la única plantilla con personas, y el personaje debe variar en cada uso.** Rota entre: un hombre joven en su taller, una señora mayor atendiendo su tienda, dos socias revisando pedidos, un repartidor entregando un paquete, un padre con su hijo empacando, una vendedora de mercado con su celular. Varía edad, género, contexto y vestuario. **No repitas la mujer joven con lentes y mandil teal** — ya salió en decenas de piezas.

### 6 · CHECKLIST
Estilo libreta o cuaderno cuadriculado: fondo con líneas o cuadrícula tenue, y 5 o 6 ítems con casillas marcadas a mano en teal, algunos con subrayado irregular. Se ve escrito, no diseñado. El titular arriba, como encabezado de página de cuaderno. Puede incluir un clip o una esquina doblada.

---

## Prompt base

Rellena `{PALETA}`, `{TITULAR}`, `{SUBTITULO}` y el bloque `{LAYOUT}` según la plantilla elegida.

```
A charming hand-drawn illustrated infographic poster, vertical, friendly editorial illustration style
with doodle icons. {PALETA} with a subtle warm paper texture — warm and inviting, like a nicely
printed zine. No orange, no red, no saturated blue.

Big bold hand-lettered title: "{TITULAR}"
Below it, a smaller line: "{SUBTITULO}"

{LAYOUT}

IMPORTANT: the bottom 25% of the poster must be completely empty background — no panels, no text,
no drawings, no border. All content must sit in the upper three quarters.

All text in Spanish, spelled exactly as written above including every accent mark, perfectly legible.
Do not add any other words, paragraphs, logos or signatures.
```

### Reglas de texto

- Titular: máximo 4 palabras, en mayúsculas, **con tildes** (`TÍTULOS`, no `TITULOS`).
- Subtítulo: una línea, máximo 8 palabras.
- Etiquetas: 2–4 palabras cada una. Sin montos ni monedas (ni `S/` ni `$`), porque la misma imagen sirve para MiTienda y TiendaBox.
- Enumera explícitamente en el prompt cada palabra que lleve tilde. gpt-image-1.5 las omite si no se le insiste.

### Revisión obligatoria

Abre la imagen resultante con `Read` antes de publicar. Si hay una palabra mal escrita o una tilde faltante, regenera una vez con las tildes enumeradas. Si falla la segunda, usa el respaldo `--layout=stack` con la ilustración de cabecera del artículo y anótalo en el reporte.
