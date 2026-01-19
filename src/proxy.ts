import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', req.url));
  }

  return NextResponse.next();
}
