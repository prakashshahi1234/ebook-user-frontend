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

function ResizableBar({ section }:section) {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const {data} = await Axios.get("/me");
      return data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  const {user} = data;


  return (
    <div className="w-full h-[100vh]">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        <ResizablePanel minSize={20} defaultSize={20} maxSize={35}>
          <div className="h-full  mx-1 flex items-center justify-center p-2">
            <SideBar   
               profileImage={user?.profileImage}
               name={user?.name || ""}
               username={user?.userId || ""}
               searchParams={section}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-gray-300 my-2 border-r-2 mr-2" />

        <ResizablePanel defaultSize={80}>
           <MainSection
            section={section}
            user={user}
           />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default ResizableBar;
