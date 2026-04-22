import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
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
