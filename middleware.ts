import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/lock'
])

export default clerkMiddleware(async (auth, request) => {
  // Check if the website is unlocked (skip for lock page and API routes)
  if (!request.nextUrl.pathname.startsWith('/api') && 
      !request.nextUrl.pathname.startsWith('/lock') &&
      !request.nextUrl.pathname.startsWith('/_next')) {
    
    const unlocked = request.cookies.get('mediko_unlocked')?.value;
    
    if (!unlocked) {
      return NextResponse.redirect(new URL('/lock', request.url));
    }
  }

  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};