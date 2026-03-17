// api.client.ts
export async function apiClientFetch(endpoint: string, options?: RequestInit) {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
        },
    });
}