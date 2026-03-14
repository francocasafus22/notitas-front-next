import { cache } from "react";
import { apiFetch } from "../lib/api";

export const getNotes = () => apiFetch("/post")