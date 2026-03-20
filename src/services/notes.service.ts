import { cache } from "react";
import { apiFetch } from "../lib/api";
import { apiClientFetch } from "../lib/api.client";
import { notFound } from "next/navigation";

export const getNotes = () => apiFetch("/post")
export const getNote = async (slug : string) => apiClientFetch(`/post/${slug}`)