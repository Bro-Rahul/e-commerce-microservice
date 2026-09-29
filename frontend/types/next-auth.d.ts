// types/next-auth.d.ts

import { LoginResponseType } from "@/types/auth";

declare module "next-auth" {
    interface Session {
        user: LoginResponseType;
    }

    interface User {
        token: string;
        user: LoginResponseType;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: LoginResponseType;
    }
}