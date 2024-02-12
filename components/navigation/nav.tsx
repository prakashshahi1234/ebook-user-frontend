"use client";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
// import logo from "@/asset/logo.png";
import { useRouter } from "next/navigation";
import { bookItem, useCart } from "@/hooks/useCart";
import { Button } from "../ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";

export default function Nav() {
  const router = useRouter();
  const { books , addItem } = useCart();
  

  return (
    <nav className="sticky top-0 bg-white z-50">
      {/* {order && <div><Link href={'/your-order'}>your order</Link></div>} */}
      <div className="flex flex-col md:flex-row items-center justify-evenly  z-10 bg-white opacity-100">
        <div>
          {/* <Image
            className="cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
            height={200}
            width={200}
            src={logo}
            alt="logo"
          /> */}
        </div>
        <div>
          <NavigationMenu className="max-w-full w-full">
            <NavigationMenuList className="max-w-full flex flex-row justify-between items-center">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <Link href="/shop" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Shop
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}
              <NavigationMenuItem className="md:flex">
                <Link href="/user/profile?section=set-up-profile" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant={"outline"}
                  className="relative"
                  onClick={() => router.push("/checkout")}
                >
                  <ShoppingBasketIcon />
                  <span className="absolute top-1 right-0 bg-black text-white h-5 rounded w-5">
                    {books.length}
                  </span>
                </Button>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm", // Adjusted font size
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {" "}
            {/* Adjusted font size */}
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
