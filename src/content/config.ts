import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      path: z.string(),
      date: z.string().transform((date) => new Date(date)),
      title: z.string(),
      tags: z.array(z.string()),
      cover: image(),
      backgroundPosition: z.string().optional(),
    }),
});

export const collections = { blog };
