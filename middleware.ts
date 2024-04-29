import { authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//     '/dashboard(.*)',
//     '/forum(.*)',
//   ]);

// export default clerkMiddleware({

// });

export default authMiddleware({
    publicRoutes: [
        '/',
        '/events/:id',
        '/api/webhooks/clerk',
        '/api/webhooks/stripe',
        '/api/uploadthing',
        '/assets/:path*',
        '/favicon.ico'
    ],
    ignoredRoutes: [
        '/api/webhooks/clerk',
        '/api/webhooks/stripe',
        '/api/uploadthing',
        '/assets/:path*',
        '/favicon.ico'
    ]
})

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};