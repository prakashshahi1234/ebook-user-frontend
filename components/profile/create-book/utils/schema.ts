import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export const formSchema = z.object({
    title: z.string().regex(/^[a-zA-Z0-9\s]+$/, "invalid title you can use only alphanumeric character."),
    author: z.string().min(1, "Author is required."),
    url: z.string().min(1,"Upload Pdf File."), // Assuming a URL for PDF file upload
    coverImageUrl: z.string().url("invalid cover image URL"), // Assuming a URL for image file upload
    description: z.string().min(1,"description is required.").max(2000 , "maximum 4000 character."),
    keywords: z.string().min(1, "keywords are required."),
    category: z
      .string()
      .refine(
        (val) =>
          [
            "fiction",
            "non-fiction",
            "science-fiction",
            "mystery",
            "romance",
          ].includes(val),
        {
          message: "Invalid category",
        }
      ),
    price: z.coerce.number().gte(0, 'Must be 0 and above'),
  });
  
  export type FormData = z.infer<typeof formSchema>;






