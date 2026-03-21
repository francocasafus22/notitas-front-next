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

export async function deleteCommentAction(commentId: string, postId: string, prevState: ActionStateType, formData: FormData){


    // Delete Comment

    const token = await getToken()
    
    const req = await fetch(`${process.env.API_URL}/comment/${commentId}`, {
        method: "DELETE",
        headers: {            
            Cookie: `NOTITAS_TOKEN=${token}`,
        },
        credentials: "include",        
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