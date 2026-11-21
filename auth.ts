import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import pkg from "./package.json"

// Browsers share cookies across ports, so two Auth.js apps on localhost
// overwrite each other's session cookie unless each one uses its own name.
const sessionCookieName =
  process.env.AUTH_COOKIE_NAME ||
  `${pkg.name.replace(/[^\w.-]/g, "-")}.session-token`

const users = (process.env.AUTH_USERS || "")
  .split(",")
  .filter(Boolean)
  .map((entry) => {
    const [id, username, password] = entry.split(":")
    return { id, username, password }
  })

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        const user = users.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        )
        if (!user) return null
        return { id: user.id, name: user.username, email: user.username }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    // 90 days, so you are not logged out every few days while developing.
    // Removing a user from AUTH_USERS does not end their session; changing
    // AUTH_SECRET or the cookie name does.
    maxAge: 60 * 60 * 24 * 90,
  },
  cookies: {
    // Only the name is overridden. Auth.js merges in its own options, so the
    // Secure flag still follows the request protocol (https or not).
    sessionToken: { name: sessionCookieName },
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isLoginPage = nextUrl.pathname === "/login"

      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL("/dashboard/home", nextUrl))
      }
      if (!isLoggedIn && !isLoginPage) {
        return Response.redirect(new URL("/login", nextUrl))
      }
      return true
    },
  },
})
