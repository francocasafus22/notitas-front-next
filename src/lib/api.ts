export async function apiFetch(endpoint: string, options?: RequestInit){
    const res = await fetch(`${process.env.API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...(options?.headers || {}),
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    
    if(!res.ok) throw new Error("API Error")

    return res.json();
}