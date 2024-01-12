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

function ResizableBar({ section }:section) {


  return (
    <div className="w-full h-[100vh]">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        <ResizablePanel minSize={20} defaultSize={20} maxSize={35}>
          <div className="h-full  mx-1 flex items-center justify-center p-2">
            <SideBar   
               profileImage={"https://media.licdn.com/dms/image/D5603AQH2nhKPN6LApg/profile-displayphoto-shrink_800_800/0/1681317694930?e=2147483647&v=beta&t=ZqWwsky11ZtH4nr71-7Wg2vCPezHVB2LLAk4Ep5JqJg"}
               name={"Prakash Shahi"}
               username={"@prakashshahi"}
               searchParams={section}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-gray-300 my-2 border-r-2 mr-2" />

        <ResizablePanel defaultSize={80}>
           <MainSection
            section={section}
           />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default ResizableBar;
