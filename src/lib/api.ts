import { notFound, unauthorized } from "next/navigation"

export async function apiFetch(endpoint: string, options?: RequestInit){
    const res = await fetch(`${process.env.API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...(options?.headers || {}),
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        
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
        
    return res.json();
}