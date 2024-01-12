import { section } from "@/types/profile";
import ProfileForm from "./profile-setup/Profile-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookForm from "./create-book/CreateBook";
import IdentityVerification from "./identity-verification/IdentityVerification";
import PaymentSetupForm from "./payment-setup/PaymentSetup";

function MainSection({ section }: section) {
  return (
    <div className="w-full border rounded border-gray-300 h-screen mt-2 mx-1 overflow-auto">
      {section === "set-up-profile" && (
        <div className="w-full m-auto ">
          <ProfileForm
            username="prakashshahi"
            name="Prakash Shahi"
            email="prakashshaiprince@gmail.com"
            email_verified="Verified"
            socialLink={["https://facebpook.com", "https://linkedinc.com"]}
            description="hello i am prakash shahi"
            isSuspended="Your account is well."
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
            name=""
            country=""
            province=""
            district=""
            municipality=""
            wardNo=""
            toleName=""
            profession=""
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
