import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AuthSession } from "../types/auth";


const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
   callbacks: {
    authorized({ auth }: { auth: AuthSession | null }) {
      return !!auth?.user;
    },
},
 pages: {
    signIn: "/auth/login",
  },
};

export const {auth ,signIn, signOut, handlers:{GET, POST}} = NextAuth(authConfig);