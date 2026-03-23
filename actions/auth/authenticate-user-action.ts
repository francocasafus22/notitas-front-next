"use server"

import { JWTSchema } from "@/src/schemas/auth/jwt-schema";
import { LoginSchema } from "@/src/schemas/auth/login-schema";
import { ErrorSchema } from "@/src/schemas/error-message.schema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


type ActionStateType = {
    errors: string[];
    success: string;
}

export async function authenticateAction(prevState: ActionStateType, formData: FormData){

    const loginData = {
        username: formData.get("username"),
        password: formData.get("password")
    }

    // Validate 

    const login = LoginSchema.safeParse(loginData);

    if(!login.success){
        const errors = login.error.issues.map((issue) => issue.message);
        return{
            errors, success: ""
        }
    }

    // Login

    const url = `${process.env.API_URL}/auth/login`;    

    const req = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: login.data.username,
            password: login.data.password
        })
    })

    const json = await req.json()

    console.log(json)

    if(!req.ok){
        const error = json.message;        
        return {
            errors: [error],
            success: ""
        }
    }


    redirect("/");

}