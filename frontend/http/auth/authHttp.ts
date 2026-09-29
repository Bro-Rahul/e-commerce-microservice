import { LoginRequestType } from "@/validators/auth/LoginRequestValidator";
import baseURL from "../baseURL";
import { apiFetch } from "../authHelper";
import { LoginResponseType } from "@/types/authType";

const userServiceURL = "http://localhost:8080"

const userPrefix = "/users"

const authURL = baseURL ? `${baseURL}${userPrefix}` : `${userServiceURL}${userPrefix}`


export const loginUser = async (
    payload: LoginRequestType
) => {

    return apiFetch<LoginResponseType>(
        `${authURL}/auth/login`,
        {
            method: "POST",
            body: JSON.stringify(payload),
        }
    );
};