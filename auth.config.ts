// auth.config.ts  (project root)
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login', // use your own login page instead of the Auth.js default
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            const path = nextUrl.pathname;
            const isProtected =
                path.startsWith('/dashboard') ||
                path.startsWith('/projects/create') ||
                (path.startsWith('/projects/') && path.endsWith('/edit'));

            if (isProtected) {
                if (isLoggedIn) return true;
                return false; // redirects to /login
            }

            // Redirect already-logged-in users away from the login page
            if (isLoggedIn && path === '/login') {
                return Response.redirect(new URL('/projects', nextUrl));
            }

            return true;
        },
    },
    providers: [], // providers are added in auth.ts
} satisfies NextAuthConfig;