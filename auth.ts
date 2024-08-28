import NextAuth, { User, NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

//--------------------------------------------------------------------------

export const BASE_PATH = "/welcome"

const authOptions: NextAuthConfig = {
  pages: {
    signIn: "../../../welcome",
    signOut: "/",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  //basePath: BASE_PATH,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
