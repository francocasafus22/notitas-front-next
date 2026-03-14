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
            "Authorization": `Bearer ${token}`
        }
    });

    return req.json().then((res) => {
        return res
    })
})