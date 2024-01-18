"use client"
import { AvatarIcon, PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import {
  BookIcon,
  Edit2Icon,
  GitGraph,
  LibraryIcon,
  LogOut,
  PlayIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { sideBarTypes } from "@/types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";
import { Axios } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import {logout} from '@/services/authentication'

export function SideBar({ profileImage, name, username , searchParams}: sideBarTypes) {
  const router = useRouter();
  const buttonStyles =
    "bg-white p-2 m-1 hover:pl-2 w-full text-start flex flex-row justify-start items-center text-muted-foreground hover:bg-black hover:text-white transition-all duration-300";

  const isActive = (section: string) => searchParams=== section;
 

 


  return (
    <div className="w-full border rounded border-gray-300 h-full">
      <div className="flex fle-row justify-between text-center items-center p-5 w-full">
        <Avatar  className="h-20 w-20">
          <AvatarImage height={300} width={300} src={profileImage} />
          <AvatarFallback>{name?name?.toUpperCase()?.split(" ")[0][0] +" "+ name?.toUpperCase()?.split(" ")[1][0]:"Profile"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center p-2 w-full">
          <p className="font-semibold text-lg">{name}</p>
          {/* <small className="text-gray-500">{username}</small> */}
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="p-2 m-1 h-2/3 overflow-auto">
        <Button
          className={cn(buttonStyles, {
            "bg-black": isActive("set-up-profile"),
            "text-white": isActive("set-up-profile"),
          })}
          onClick={() => router.push("?section=set-up-profile")}
        >
          <Edit2Icon className="mr-3 h-4 w-4" />
          <span className="ml-3 text-sm subpixel-antialiased">
            Set Up Profile
          </span>
        </Button>

        <Button
          className={cn(buttonStyles, {
            "bg-black": isActive("identity-verification"),
            "text-white": isActive("identity-verification"),
          })}
          onClick={() => router.push("?section=identity-verification")}
        >
          <PersonIcon className="mr-3 h-4 w-4" />
          <span className="ml-3 text-sm subpixel-antialiased">
            Identity Verification
          </span>
        </Button>

        <Button
          className={cn(buttonStyles, {
            "bg-black": isActive("payment-setup"),
            "text-white": isActive("payment-setup"),
          })}
          onClick={() => router.push("?section=payment-setup")}
        >
          <PlayIcon className="mr-3 h-4 w-4" />
          <span className="ml-3 text-sm subpixel-antialiased">
            Payment Setup
          </span>
        </Button>

        <Button
          className={cn(buttonStyles, {
            "bg-black": isActive("books"),
            "text-white": isActive("books"),
          })}
          onClick={() => router.push("?section=books")}
        >
          <BookIcon className="mr-3 h-4 w-4" />
          <span className="ml-3 text-sm subpixel-antialiased">Your Books</span>
        </Button>

        <Button
          className={cn(buttonStyles, {
            "bg-black": isActive("library"),
            "text-white": isActive("library"),
          })}
          onClick={() => router.push("?section=library")}
        >
          <LibraryIcon className="mr-3 h-4 w-4" />
          <span className="ml-3 text-sm subpixel-antialiased">Library</span>
        </Button>

        <Button
          className={cn(buttonStyles, {
            "bg-black": isActive("analytics"),
            "text-white": isActive("analytics"),
          })}
          onClick={() => router.push("?section=analytics")}
        >
          <GitGraph className="mr-3 h-4 w-4" />
          <span className="ml-3 text-sm subpixel-antialiased">Analytics</span>
        </Button>
        <Button
          className={cn(buttonStyles, {
            "bg-black": isActive("analytics"),
            "text-white": isActive("analytics"),
          })}
          onClick={logout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="ml-3 text-sm subpixel-antialiased">Log out</span>
        </Button>
      </div>
    </div>
  );
}

export default SideBar;

