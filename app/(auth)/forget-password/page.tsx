// Import your components
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChangeEventHandler,
  FormEvent,
  ReactComponentElement,
  useState,
} from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Basic email validation
    setIsValidEmail(e.target.checkValidity());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Implement API call here and check response
    // If successful response, show a success message
    // If unsuccessful response, handle the error

    // For now, let's log the email for demonstration
    console.log("Email submitted:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="min-w-[320px] max-w-[450px] p-6 border border-gray-300 rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-4 text-center">Forget Password</h3>
        <p className="text-muted-foreground mb-2 text-center">
          Please enter your email. we will send you password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-1 text-sm">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
              required
              className={`h-10 px-3 border rounded focus:border-gray-400 transition duration-300 ${
                isValidEmail ? "" : "border-red-500"
              }`}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
              title="Enter a valid email address"
              placeholder="example@gmail.com"
            />
            {!isValidEmail && (
              <small className="text-red-500">Invalid Email</small>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
