"use server"

import { JWTSchema } from "@/src/schemas/auth/jwt-schema";
import { LoginSchema } from "@/src/schemas/auth/login-schema";
import { ErrorSchema } from "@/src/schemas/error-message.schema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CommentSchema } from "@/src/schemas/comment";
import getToken from "@/src/auth/token";
import { apiFetch } from "@/src/lib/api";
import { SuccessSchema } from "@/src/schemas/success-message.schema";
import { revalidateTag } from "next/cache";


type ActionStateType = {
    errors: string[];
    success: string;
}

export async function addCommentAction(postId: string, prevState: ActionStateType, formData: FormData){

    const addCommentData = {
        body: formData.get("body")
    }

    const comment = CommentSchema.safeParse(addCommentData);

    if(!comment.success) return {errors: comment.error.issues.map((issue) => issue.message), success: ""}

    // Create comment

    const token = await getToken()
    
    const req = await fetch(`${process.env.API_URL}/comment/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Cookie: `NOTITAS_TOKEN=${token}`,
        },
        credentials: "include",
        body: JSON.stringify(comment.data)
    })

    const json = await req.json()

    if(!req.ok){
        const {error} = ErrorSchema.parse(json);
        return {
            errors: [error], success: ""
        }
    }

    const {message} = SuccessSchema.parse(json); 


    revalidateTag("comments", postId)

    return {
        errors: [], success: message
    }

}