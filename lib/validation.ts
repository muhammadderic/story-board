import { z } from "zod"

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(20),
  story: z.string().min(3).max(1000),
})