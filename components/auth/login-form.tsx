"use client"



import Link from "next/link";
import InputForm from "../ui/input-form";
import { useActionState, useEffect, useState } from "react";
import { authenticateAction } from "@/actions/auth/authenticate-user-action";
import { login } from "@/src/services/auth.service";
import { useRouter } from "next/navigation";
import ErrorMessage from "../error-message";



export default function LoginForm() {


    const [error, setError] = useState<string>("");
    

    const router = useRouter()

    return (
        <form  
                className="flex flex-col w-full gap-2"
                onSubmit={async (e)=>{
                    e.preventDefault();

                    const formData = new FormData(e.currentTarget);
                    
                    const username = formData.get("username") as string;
                    const password = formData.get("password") as string;
            
                    try{
                        await login(username,password);
                        router.push("/")
                    } catch(error:string|any){                        
                        setError(error.message)
                    }                                                
                    
                    
                }}
                >
                

                <InputForm
                    label={"Username"}
                    name={"username"}
                    type={"text"}
                    required
                    placeholder={"Enter your username"}                    
                />
            
                <InputForm
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                    required
                    placeholder={"Enter password"}                    
                ></InputForm>

                <ErrorMessage message={error} />

                <button
                    className="
                    bg-primary text-primary-foreground
                    text-warm-500 rounded-lg py-2 mt-2
                    shadow-md transition-all duration-300 cursor-pointer
                    hover:brightness-105 
                "
                type="submit"
                >
                    Login
                </button>
                
                </form>
    )
}
