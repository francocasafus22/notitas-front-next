"use client"



import Link from "next/link";
import InputForm from "../ui/input-form";
import { useActionState, useEffect } from "react";
import { authenticateAction } from "@/actions/auth/authenticate-user-action";
import { login } from "@/src/services/auth.service";
import { useRouter } from "next/navigation";



export default function LoginForm() {


    const [state, dispatch, isPending] = useActionState(authenticateAction, {
    errors: [],
    success: "",
    });

    useEffect(()=>{
        console.log(state?.errors)
    }, [state])


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
                    } catch(error){
                        console.error(error)
                    }
                    
                }}
                >
                

                <InputForm
                    label={"Username"}
                    name={"username"}
                    type={"text"}
                    required
                    placeholder={"Enter your username"}
                    register={()=>{}}
                />
            
                <InputForm
                    label={"Password"}
                    name={"password"}
                    type={"password"}
                    required
                    placeholder={"Enter password"}
                    register={()=>{}}
                ></InputForm>

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
