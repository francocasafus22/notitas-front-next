import { cache } from "react";
import { apiFetch } from "../lib/api";
import { apiClientFetch } from "../lib/api.client";
import { notFound } from "next/navigation";
import getToken from "../auth/token";

export const getNotes = () => apiFetch("/post")
export const getNote = async (slug : string) => apiClientFetch(`/post/${slug}`)
export const getNotesByUser = async (user : string) => {
    const token = await getToken()
    return apiClientFetch(`/post/user/${user}`, { headers: { Cookie: `NOTITAS_TOKEN=${token}` } })
}