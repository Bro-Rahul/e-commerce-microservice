import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (request.nextUrl.pathname.startsWith("/seller") && token?.user.role === "SELLER") {
        return NextResponse.next();
    }
    if (request.nextUrl.pathname.startsWith("/admin") && token?.user.role === "ADMIN") {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/seller/:path*", "/admin/:path*"],
};