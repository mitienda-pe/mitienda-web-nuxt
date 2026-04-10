import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: 'blog/**',
      type: 'page',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().default('MiTienda'),
        countries: z.array(z.string()).default(['PE', 'EC', 'CO']),
      }),
    }),
  },
})
