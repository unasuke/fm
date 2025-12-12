import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";

const episodes = defineCollection({
  loader: file("episodes.yaml"),
  schema: z.object({
    id: z.number().int().nonnegative(),
    date: z.date(),
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    guests: z.array(
      z.object({
        twitter: z.string().optional(),
        github: z.string().optional(),
      }),
    ),
    transcription: z.string().url().optional(),
  }),
});

export const collections = {
  episodes,
};
