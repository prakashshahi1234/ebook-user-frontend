import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { Axios } from "./utils/axios";
import { cookies } from "next/headers";


export  function middleware(request: NextRequest, event: NextFetchEvent) {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (refreshToken && !accessToken) {
    event.waitUntil(
      fetch(`http://localhost:3002/api/v1/get-access-token`, {
        credentials: "same-origin",

        headers: {
          refreshToken: refreshToken.value,
        },
      })
        .then(async (res) => {
          const tokenString = res.headers.getSetCookie();
          // request.cookies.set("accessToken" , tokenString[0])
          // cookies().set("accessToken", tokenString[0])
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {})
        
    );
  }

  // if logged in redirect to home page.
  if (
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/forget-password")
  ) {
    if (accessToken && refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // if user is not looged in.
  if(pathname.startsWith("/user") || pathname.startsWith("/checkout")){
  if(!accessToken && !refreshToken){
     return NextResponse.redirect(new URL("/login", request.url));  
  }
  }


}

