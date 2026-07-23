import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function getRoleRedirectPath(role: string) {
  switch (role) {
    case 'member':
      return '/member'
    case 'trainer':
      return '/trainer/dashboard'
    case 'superadmin':
      return '/superadmin/dashboard'
    case 'owner':
    default:
      return '/owner/dashboard'
  }
}

const PUBLIC_ROUTES = [
  '/',
  '/features',
  '/pricing',
  '/about',
  '/contact',
  '/login',
  '/telegram',
]

function isPublicRoute(pathname: string) {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith('/api/')) return true;
  if (pathname.startsWith('/_next') || pathname.includes('.')) return true;
  return false;
}

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

  const pathname = request.nextUrl.pathname

  // Detect role from app_metadata or user_metadata fallback
  const role = user?.app_metadata?.role || user?.user_metadata?.role || 'owner'
  const targetPath = getRoleRedirectPath(role)

  // Redirect logged-in users away from /login to their role dashboard
  if (user && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL(targetPath, request.url))
  }
  
  // Protect private routes from unauthenticated users
  if (!user && !isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Role-based access control for protected sections
  if (user) {
    if (pathname.startsWith('/owner') && role !== 'owner') {
      return NextResponse.redirect(new URL(targetPath, request.url))
    }
    if (pathname.startsWith('/trainer') && role !== 'trainer') {
      return NextResponse.redirect(new URL(targetPath, request.url))
    }
    if (pathname.startsWith('/superadmin') && role !== 'superadmin') {
      return NextResponse.redirect(new URL(targetPath, request.url))
    }
    if (pathname.startsWith('/member') && role !== 'member') {
      return NextResponse.redirect(new URL(targetPath, request.url))
    }
  }

  return supabaseResponse
}
