"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

// Import necessary modules, including the cn utility function

const ForgetPassword = () => {

  const ForgetPasswordValidator = z.object({
    email: z.string().email({ message: "Please enter a valid email." }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgetPasswordValidator),
  });

  const resetPasswordMutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async ({ email }: TForgetPasswordValidatorType) =>
      await Axios.post(`/forget-password`, { email }),
  });
  const { data, isPending } = resetPasswordMutation;
  type TForgetPasswordValidatorType = z.infer<typeof ForgetPasswordValidator>;

  const onSubmit: SubmitHandler<TForgetPasswordValidatorType> = async (
    data
  ) => {
    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password reset link sent successfully.");
      },
      onError: (error: any) => {
        toast.error("Failed to send reset link", {
          description:
            error?.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      },
    });
  };

  return (
    <div
      className={cn(
        "container relative flex pt-20 flex-col items-center justify-center lg:px-0"
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"
        )}
      >
        <div className={cn("flex flex-col items-center space-y-2 text-center")}>
          <h1 className={cn("text-2xl font-semibold tracking-tight")}>
            Forget Password
          </h1>
          <Link className={cn("text-blue-500")} href="/login">
            Remembered your password? Login
          </Link>
        </div>
        {data ? (
          <div>
            
            <p className="text-muted-foreground mb-2 text-center">
              Check your email. we have sent password reset link.
            </p>
          </div>
        ) : (
          <div className={cn("")}>
            <p className="text-muted-foreground mb-2 text-center">
              Please enter your email. we will send you password reset link.
            </p>
              {/* @ts-ignore */}
            <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4")}>
              <div className={cn("flex flex-col")}>
                <Label htmlFor="email" className={cn("mb-1 text-sm")}>
                  Email
                </Label>
                <Input
                  
                  id="email"
                  {...register("email")}
                  className={cn(
                    `h-10 px-3 border rounded focus:border-gray-400 transition duration-300 ${
                      errors.email ? "border-red-500" : ""
                    }`
                  )}
                  placeholder="example@gmail.com"
                />
                {errors.email && (
                  <small className={cn("text-red-500")}>
                    {errors.email.message as ReactNode}
                  </small>
                )}
              </div>
              <Button
                type="submit"
                isLoading={isPending}
                className={cn(
                  "w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                )}
              >
                Submit
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
