import { withAuth } from "next-auth/middleware"

// Export the middleware as the default export — Next.js accepts a default
// function or a named `middleware` export. Using default avoids runtime
// edge-wrapper issues in some environments.
const _withAuth = withAuth()

// Export both a named `middleware` and a default export. Some Next.js
// environments/tools expect a named export while others accept the default.
export const middleware = _withAuth
export default _withAuth

export const config = {
  matcher: ["/protected/:path*", "/account/:path*"],
}
