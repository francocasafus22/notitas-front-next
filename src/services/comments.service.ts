import { cache } from "react";
import { apiFetch } from "../lib/api";
import { apiClientFetch } from "../lib/api.client";
import { notFound } from "next/navigation";

export const getComments = async (postId : string) => apiClientFetch(`/comment/${postId}`, {next: {
    tags: ["comments", postId]
}})