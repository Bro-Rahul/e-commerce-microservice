// types/next-auth.d.ts

import { LoginResponseType } from "@/types/authType";
import { UserType } from "./user/userType";

declare module "next-auth" {
    interface Session {
        user: UserType;
    }

    type User = UserType
}

declare module "next-auth/jwt" {
    interface JWT {
        user: UserType;
        token: string
    }
}