"use server"

import getToken from "@/src/auth/token";
import { ErrorSchema } from "@/src/schemas/error-message.schema";
import { SuccessSchema } from "@/src/schemas/success-message.schema";
import { EditProfileSchema } from "@/src/schemas/user";
import { revalidatePath, revalidateTag } from "next/cache";


type ActionStateType = {
    errors: string[];
    success: {
        message: string,
        username: string
    };
}

export async function editProfileAction(username:string, prevState: ActionStateType, formData: FormData){

    const editProfileData = {
        username: formData.get("username"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
    }

    // validate

    const result = EditProfileSchema.safeParse(editProfileData);

    if(!result.success){
        const errors = result.error.issues.map((issue) => issue.message);
        return{
            errors, success: {message: "", username: ""}
        }
    }

    // update

    const token = await getToken();
    
    const url = `${process.env.API_URL}/user`;

    const req = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",            
            Cookie: `NOTITAS_TOKEN=${token}`,
        },
        credentials: "include",
        body: JSON.stringify(result.data)
    })

    const json = await req.json();
    

    if(!req.ok){
        const {error} = ErrorSchema.parse(json);
        return {
            errors: [error], success: {
                message: "",
                username: ""
            }
        }
    }

    const {message} = SuccessSchema.parse(json);

    return{
        errors: [], success: {message, username: json.username}
    }

}