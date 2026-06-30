import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { AUTHBASEURL } from "@/http/auth";


const options: NextAuthOptions = {
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // This is the response from your credentials authorize() function
                token.user = user as any;
            }

            return token;
        },

        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    session: {
        maxAge: 60 * 60 * 24 * 30
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'ShopDirect',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)

                const request = await fetch(`${AUTHBASEURL}/login/`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const user = await request.json()

                console.log(user)

                // If no error and we have user data, return it
                if (request.ok && user) {
                    return user
                }
                const error = user.error || "Login Failed Provide a valid credencials"
                throw new Error(error);
            }
        })
    ],
    pages: {
        signIn: "/login",
    }
}

export default options;