import NextAuth, { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

//--------------------------------------------------------------------------

export const BASE_PATH = "/welcome"

const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/welcome",
    //signOut: "/welcome",
    //error: "/welcome",
    //verifyRequest: "/auth/verify-request", // (used for check email message in credentials provider)
    //newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
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

// "@types/react": "npm:types-react@rc",
// "@types/react-dom": "npm:types-react-dom@rc",

// "overrides": {
//   "@types/react": "npm:types-react@rc",
//   "@types/react-dom": "npm:types-react-dom@rc"
// },
