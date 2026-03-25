"use server"

import getToken from "@/src/auth/token";
import { ErrorSchema } from "@/src/schemas/error-message.schema";
import { SuccessSchema } from "@/src/schemas/success-message.schema";
import { revalidateTag } from "next/cache";

type ActionStateType = {
    errors: string[];
    success: string;
}

export async function likeNoteAction(postId: string, prevState: ActionStateType, formData: FormData){

    const token = await getToken();    
    
    const url = `${process.env.API_URL}/post/like/${postId}`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `NOTITAS_TOKEN=${token}`,
        },
        credentials: "include",
    });

    const json = await req.json()


    if(!req.ok){
        const {error} = ErrorSchema.parse(json);
        return {
            errors: [error], success: ""
        }
    }

    const {message} = SuccessSchema.parse(json)
    
    revalidateTag("notes", "default")

    return{
        errors: [], success: message
    }

}