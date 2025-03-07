import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { stepsOnboarding } from "@/utils/variables";
import { supabase } from "./lib/supabase/client";

export async function getUser(response: NextResponse, request: NextRequest) {
  const supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  return user;
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const path = new URL(request.url).pathname;

  const protectedRoutes = ["/", "/onboarding"];
  const authRoutes = [
    "/login",
    "/sign-up",
    "/authentication",
    "/update-password",
    "/reset-password",
    "/send-reset-password",
    "/terms-of-service",
    "/usage-policy",
    "/privacy-policy",
  ];
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const isEmailConfirm = path.includes("onboarding/confirm-email");

  if (isProtectedRoute || isAuthRoute) {
    const user = await getUser(response, request);

    if (!user && isProtectedRoute && !isEmailConfirm) {
      return NextResponse.redirect(new URL("/authentication", request.url));
    }
    if ((isAuthRoute && user) && !isEmailConfirm) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    if (isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/onboarding/${stepsOnboarding.at(0)}`, request.url)
      );
    }
  } else {
    const user = await getUser(response, request);
    if (!user && !isAuthRoute && !isEmailConfirm) {
      return NextResponse.redirect(new URL("/authentication", request.url));
    }
    if (path == "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard/career-coach", request.url));
    }
    if (!path.includes("/dashboard")) {
      const { data, error } = await supabase
      .from("users")
      .select()
      .ilike("email", `${user?.email}`)
      .single();
      if (data?.finished_onboarding) {
        return NextResponse.redirect(new URL("/dashboard/career-coach", request.url));
      } else if (!path.includes("/onboarding")) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    }
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/.*|auth/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
