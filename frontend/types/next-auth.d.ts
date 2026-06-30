import NextAuth from "next-auth";
import { LoginResponseType } from "./auth/authTypes";


declare module "next-auth" {
    interface Session {
        user: LoginResponseType;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: LoginResponseType;
    }
}