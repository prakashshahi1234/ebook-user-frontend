import { section } from "@/types/profile";
import ProfileForm from "./profile-setup/Profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookForm from "./create-book/CreateBook";
import IdentityVerification from "./identity-verification/IdentityVerification";
import PaymentSetupForm from "./payment-setup/PaymentSetup";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import Library from "./library/library";
import Purchased from "./your-purchased/Purchased";

function MainSection({ section , user}:any) {

const {identityDetail , paymentDetail} = user;
 
  return (
    <div className="w-full border rounded border-gray-300 h-screen mt-2 mx-1 overflow-auto">
      {section === "set-up-profile" && (
        <div className="w-full m-auto ">
          <ProfileForm
            mobileNo={user?.mobileNo || ""}
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
              <BookForm />           
        </div>
      )}

      {section === "identity-verification" && (
        <div className="w-full m-auto">
          <IdentityVerification
            identityImageUrl={identityDetail?.identityImageUrl}
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
              isVerified={paymentDetail?.isVerified}
              isSubmitted={paymentDetail?.isSubmitted}
            bankName={paymentDetail?.bankName || ""}
            branch={paymentDetail?.branch || ""}
            accountHolderName={paymentDetail?.accountHolderName || ""}
            accountNumber={paymentDetail?.accountNumber || ""}
          />
        </div>
      )}
      {section === "library" && (
        <div className="w-full m-auto">
          <Library/>
        </div>
      )}
       {section === "your-purchased" && (
        <div className="w-full m-auto">
           <Purchased
           
           />
        </div>
      )}
    </div>
  );
}

export default MainSection;
