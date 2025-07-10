import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/services/auth";
import { cookies } from "next/headers";


export async function middleware(request: NextRequest) {
  const session = await auth();

  if (session) {
    return NextResponse.next();
  }

  const authToken = (await cookies()).get("AUTH_TOKEN")?.value;
   if (!authToken) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/profile", "/cart"],
};
