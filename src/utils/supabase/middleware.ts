import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Role-based routing
  const pathname = request.nextUrl.pathname;
  if (user && pathname.startsWith('/login')) {
    const role = user.app_metadata?.role || 'member';
    return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
  }
  
  if (!user && !pathname.startsWith('/login') && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Protect role-specific routes
  if (user) {
    const role = user.app_metadata?.role || 'member';
    if (pathname.startsWith('/owner') && role !== 'owner') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
    }
    if (pathname.startsWith('/trainer') && role !== 'trainer') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
    }
    if (pathname.startsWith('/superadmin') && role !== 'superadmin') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
    }
  }

  return supabaseResponse
}
