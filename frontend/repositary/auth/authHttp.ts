import { LoginRequestType } from "@/validators/auth/LoginRequestValidator";
import { apiFetch } from "../api";
import { baseURL } from "../baseURL";



export const authRepositary = {

    loginUser: async (payload: LoginRequestType) => {

        const response = await apiFetch(
            `${baseURL.userBaseURL}/auth/login`,
            {
                method: "POST",
                body: JSON.stringify(payload),
            }
        );

        return await response.json();
    }
}