import { cache } from "react";
import { apiFetch } from "../lib/api";
import { apiClientFetch } from "../lib/api.client";

export const login = async (username: string, password: string) => apiClientFetch("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) })
export const logout = async () => apiClientFetch("/auth/logout", { method: "POST" })