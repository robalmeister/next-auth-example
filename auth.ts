import type {NextAuthConfig} from "next-auth"
import NextAuth from "next-auth"

import GitHub from "next-auth/providers/github"
import {adapter} from "@/lib/db";

export const config = {
    adapter: adapter,
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
    basePath: "/",
    providers: [
        GitHub,
    ],
    session: {
        strategy: "jwt",


    },
    callbacks: {
        authorized({request, auth}) {
            const {pathname} = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        },
    },
} satisfies NextAuthConfig

export const {handlers, auth, signIn, signOut} = NextAuth(config)
