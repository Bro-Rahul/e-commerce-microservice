import { UserType } from "./user/userType"

export type LoginResponseType = {
    token: string,
    userData: UserType,
}