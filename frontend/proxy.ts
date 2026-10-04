
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const { pathname } = req.nextUrl;
    if (token && pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", req.url))
    }
    // if (!token && pathname.startsWith("/seller"))
    //     return NextResponse.redirect(new URL("/", req.url))

    return NextResponse.next();

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ['/auth/:path*', '/seller/:path']
}