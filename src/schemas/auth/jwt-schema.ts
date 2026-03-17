import z from "zod";

export const JWTSchema = z.object({
    token: z.string({ message: "Token no válido" }),
});