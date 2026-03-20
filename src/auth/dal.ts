import { cache } from "react";
import "server-only";
import getToken from "./token";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
    const token = await getToken()
    if(!token) redirect("/auth/login");

    const url = `${process.env.API_URL}/auth/me`;
    const req = await fetch(url, {
        method: "GET",
        headers: {            
            Cookie: `NOTITAS_TOKEN=${token}`,
        },
    });

    const session = await req.json();
    return session
})

export const getSession = cache(async () => {
    const token = await getToken();
    if (!token) return null;
    
    const url = `${process.env.API_URL}/auth/me`;
    const req = await fetch(url, {
        method: "GET",
        headers: {
        Cookie: `NOTITAS_TOKEN=${token}`,
        },
        credentials: "include",
    });

    const session = await req.json();
    return {
        user: session,
        isAuth: true,
    };
});