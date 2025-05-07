import { z } from "zod"

export const soldItemSchema = z.object({
  url: z.string(),
  title: z.string(),
  imageSrc: z.string(),
  price: z.string().trim(),
  location: z.string(),
  updated: z.string().transform((arg) => arg.replace("–", "").trim()),
})

export type SoldItem = z.infer<typeof soldItemSchema>
