import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const formSchema = z.object({
    title: z.string().regex(/^[a-zA-Z0-9\s]+$/, "Invalid Title."),
    author: z.string().min(1, "Author is required."),
    pdfFile: z.string().url("Invalid PDF file URL"), // Assuming a URL for PDF file upload
    coverImage: z.string().url("Invalid Cover Image URL"), // Assuming a URL for image file upload
    description: z.object({}),
    keywords: z.string().min(1, "Keywords are required."),
    category: z
      .string()
      .refine(
        (val) =>
          [
            "Fiction",
            "Non-Fiction",
            "Science Fiction",
            "Mystery",
            "Romance",
          ].includes(val),
        {
          message: "Invalid category",
        }
      ),
    price: z.coerce.number().gte(0, 'Must be 0 and above'),
  });
  
  export type FormData = z.infer<typeof formSchema>;






