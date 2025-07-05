import NextAuth from "next-auth";
import Google from "next-auth/providers/google";


const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
};

export const {auth , handlers:{GET, POST}} = NextAuth(authConfig);