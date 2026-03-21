import getToken from "../auth/token"
import { apiFetch } from "../lib/api"

export const getProfile = async (username: string) => {
    const token = await getToken()
    return apiFetch(`/user/profile/${username}`, { headers: { Cookie: `NOTITAS_TOKEN=${token}` },next: {tags: ["profile", username]} })
}