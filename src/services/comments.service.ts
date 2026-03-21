import { cache } from "react";
import { apiFetch } from "../lib/api";
import { apiClientFetch } from "../lib/api.client";
import { notFound } from "next/navigation";
import getToken from "../auth/token";

export const getComments = async (postId : string) => {

    const token = await getToken()    
    return apiClientFetch(`/comment/${postId}`, 
        {
            next: {tags: ["comments", postId]},
            headers: {
                Cookie: `NOTITAS_TOKEN=${token}`
            }
        }
    )

}