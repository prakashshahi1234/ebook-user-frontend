"use client";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SideBar from "./sidebar";
import { section } from "@/types/profile";
import MainSection from "./MainSection";
import ProfileImage from "@/assets/images/profile.png";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ResizableBar({ section }: section) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const { data } = await Axios.get("/me");
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  const { user } = data;

  return (
    <div className="w-full h-[100vh]">
           <div className="sm:flex md:hidden lg:hidden">
            <DrawerMenu />
          </div>
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        <ResizablePanel minSize={20} defaultSize={20} maxSize={35}>
          <div className="hidden lg:flex  h-full mx-1 items-center justify-center p-2">
            <SideBar
              profileImageUrl={user?.profileImageUrl}
              name={user?.name || ""}
              username={user?.userId || ""}
              searchParams={section}
            />
          </div>
        
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-gray-300 my-2 border-r-2 mr-2" />

        <ResizablePanel defaultSize={80} className="w-full">
          <MainSection section={section} user={user} />
        </ResizablePanel>
      </ResizablePanelGroup>
 
    </div>
  );
}

const DrawerMenu = () => {
  return (
    <div>
      <Drawer  >
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent >
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter >
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default ResizableBar;
