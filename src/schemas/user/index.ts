import {z} from "zod"

export const EditProfileSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
})