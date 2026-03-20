import { notFound, unauthorized } from "next/navigation";

// api.client.ts
export async function apiClientFetch(endpoint: string, options?: RequestInit) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        },
    });    

    if(!res.ok){
        switch (res.status) {
        case 401:
            unauthorized()            
        case 404: 
            notFound()
        default:
            const error = await res.json().catch(()=>null)
            throw new Error(error?.message || "Error")
        
        }    
    }

    return res.json()
}