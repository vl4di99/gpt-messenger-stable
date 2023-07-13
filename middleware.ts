import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./pages/api/auth/[...nextauth]";
import { getSession } from "next-auth/react";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
async function middleware(req: NextRequest) {
	const { pathname, origin } = req.nextUrl;
	const token = await getToken({
		req,
		secret: process.env.JWT_SECRET,
	});

	console.log("MIDDLEWAREEE", token);

	if (!token) {
		if (!pathname.startsWith("/auth"))
			return NextResponse.redirect(`${origin}/auth`);
	}

	if (token) {
		if (pathname.startsWith("/auth"))
			return NextResponse.redirect(`${origin}/chat`);
	}
	return NextResponse.next();
}

export default middleware;

export const config = {
	matcher: "/((?!api|_next|static|public|favicon.ico|public|images).*)",
};
