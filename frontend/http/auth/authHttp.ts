import { LoginRequestType } from "@/validators/auth/LoginRequestValidator";
import { apiFetch } from "../api";
import { LoginResponseType } from "@/types/authType";
import { baseURL } from "../baseURL";


export const loginUser = async (
    payload: LoginRequestType
) => {

    return apiFetch<LoginResponseType>(
        `${baseURL.userBaseURL}/auth/login`,
        {
            method: "POST",
            body: JSON.stringify(payload),
        }
    );
};