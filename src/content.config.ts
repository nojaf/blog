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
      // Shown to search engines and on social cards. Left out, the opening of
      // the post is used instead, which beats repeating the title.
      description: z.string().optional(),
      tags: z.array(z.string()),
      cover: image(),
      backgroundPosition: z.string().optional(),
      photoCredit: z
        .object({
          author: z.string(),
          username: z.string(),
          photoId: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = { blog };
