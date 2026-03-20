import {z} from "zod"

export const SuccessSchema = z.object({
    message: z.string().min(1, { message: "Valor no valido" }),
});