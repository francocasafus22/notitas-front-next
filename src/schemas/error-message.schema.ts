import {z} from "zod"

export const ErrorSchema = z.object({
  error: z.string().min(1, { message: "Valor no valido" }),
});