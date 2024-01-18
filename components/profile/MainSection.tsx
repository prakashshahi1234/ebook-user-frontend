import { section } from "@/types/profile";
import ProfileForm from "./profile-setup/Profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookForm from "./create-book/CreateBook";
import IdentityVerification from "./identity-verification/IdentityVerification";
import PaymentSetupForm from "./payment-setup/PaymentSetup";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";

function MainSection({ section , user}:any) {

const {identityDetail} = user;
 
  return (
    <div className="w-full border rounded border-gray-300 h-screen mt-2 mx-1 overflow-auto">
      {section === "set-up-profile" && (
        <div className="w-full m-auto ">
          <ProfileForm
            userId={user?.userId || ""}
            name={user?.name || ""}
            email={user?.email || ""}
            email_verified={user?.email_verified ? "verified" : "Not Verified"}
            socialLink={user?.socialLink.toString() || ""}
            description={user?.description || ""}
            isSuspended={
              user?.isSuspended?.suspended
                ? "You are suspended."
                : "Your account is well."
            }
          />
        </div>
      )}

      {section === "books" && (
        <div className="w-full m-auto">
          <Tabs defaultValue="create-book" className="">
            <TabsList>
              <TabsTrigger value="create-book">Create Book</TabsTrigger>
              <TabsTrigger value="password">All Books</TabsTrigger>
            </TabsList>
            <TabsContent value="create-book">
              <BookForm />
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      )}

      {section === "identity-verification" && (
        <div className="w-full m-auto">
          <IdentityVerification
            name={identityDetail?.name}
            country={identityDetail?.country}
            province={identityDetail?.province}
            district={identityDetail?.district}
            municipality={identityDetail?.municipality}
            wardNo={identityDetail?.wardNo}
            toleName={identityDetail?.toleName}
            profession={identityDetail?.profession}
            isVerified={identityDetail?.isVerified}
            isSubmitted={identityDetail?.isSubmitted}
          />
        </div>
      )}

      {section === "payment-setup" && (
        <div className="w-full m-auto">
          <PaymentSetupForm
            bankName="Nic"
            branch=""
            accountHolderName=""
            accountNumber=""
          />
        </div>
      )}
    </div>
  );
}

export default MainSection;
