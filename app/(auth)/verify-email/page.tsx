import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import VerifyEmail from "@/components/auth/verify-email/verifyemail";
import { FaCheckCircle } from "react-icons/fa";


function verifyEmail() {
  let error = true;
  return (
    <>
        <div className="flex items-center justify-center min-h-screen">
      <div className="min-w-[320px] w-[500px]  p-6 border border-gray-300  box-border rounded-md shadow-md">
    
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            Email Verification
          </h1>
         {!error ?<div>

          <FaCheckCircle  className="align-center m-auto h-16 w-16 mt-10 text-green-500" />{" "}
            <p className="text-muted-foreground mt-3 mb-3 text-green-500">           
          
              Thanks for verifying your email. You can now log in to your
              account.
            </p>
            <Link href="/login">
              <Button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-500">
               Continue Login{" "}
              </Button>
            </Link>
          </div> :
           <VerifyEmail/>
          }
        </div>
      </div>
    </>
  );
}

export default verifyEmail;
