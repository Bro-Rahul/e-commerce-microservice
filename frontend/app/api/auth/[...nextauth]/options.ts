import { ApiError } from "@/http/apiError";
import { loginUser } from "@/http/auth/authHttp";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import toast from "react-hot-toast";

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Sign in with ShopDirect",
            async authorize(credentials, req) {
                try {
                    const response = await loginUser({
                        email: credentials?.username ?? "",
                        password: credentials?.password ?? "",
                    });
                    return {
                        user: response,
                        token: response.token,
                        id: response.user.id,
                        email: response.user.email,
                        image: response.user.profileImage
                    };
                } catch (error) {
                    if (error instanceof ApiError) {
                        toast.error(error.message, {
                            duration: 5000,
                            position: 'bottom-right'
                        })

                    } else {
                        toast.error("Unexpected error", {
                            duration: 5000,
                            position: 'bottom-right'
                        })
                    }
                }
                return null;
            },
            credentials: {
                username: { label: "Email", type: "email", placeholder: "john@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.user = user
            }

            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        }

    },
}

export default options;