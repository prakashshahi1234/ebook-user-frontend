// 'use client'
import Image from "next/image";
import profileImage from "@/assets/images/profile.png"
import ResizableBar from "@/components/profile/ResizableBar";
function Profile({
  params,
  searchParams,
}: {
  params: { userId: string }
  searchParams: {[section:string]:string}
}) {

console.log(params , searchParams)
return <div>
      <div>
          <div className="">
               <ResizableBar
                 section ={searchParams.section}
               />
          </div>
          
      </div>
  </div>;
}
export default Profile;
