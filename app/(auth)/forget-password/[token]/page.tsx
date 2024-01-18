"use client";
// Import necessary modules, including the cn utility function
import GoogleLoginButton from "@/components/auth/google-login/googleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import { cn } from "@/utils/cn";
import { toast } from "sonner";
import { FaCheckCircle } from "react-icons/fa";
function UpdatePassword() {
  const router = useRouter();
  const { token } = useParams();

  const updatePasswordMutation = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: async ({ password, rePassword }: TUpdatePasswordType) => {
      // Extracting token from URL parameters
      // const token = router.
      if (!token) {
        throw new Error("Token not found in URL parameters");
      }
      console.log(token);
      // Sending request to update password with token
      return await Axios.put(`/reset-password/${token}`, {
        password,
        confirmPassword: rePassword,
      });
    },
  });

  type TUpdatePasswordType = z.infer<typeof UpdatePasswordValidator>;

  const UpdatePasswordValidator = z
    .object({
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." }),
      rePassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords and confirm password doesn't match",
      path: ["rePassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdatePasswordType>({
    resolver: zodResolver(UpdatePasswordValidator),
  });

  const onSubmit: SubmitHandler<TUpdatePasswordType> = async (data) => {
    updatePasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password updated successfully.");
        setTimeout(() => {
          router.push("/login");
        }, 4000);
      },
      onError: (error: any) => {
        toast.error("Failed to update password", {
          description:
            error?.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      },
    });
  };
  let { data, isPending } = updatePasswordMutation;
  return ( 
    <>
      <div
        className={cn(
          "container relative flex pt-20 flex-col items-center justify-center lg:px-0",
         
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-fit p-4 flex-col justify-center space-y-6 sm:w-[400px]",
            { "pointer-events-none": updatePasswordMutation.isPending },
            {"border border-gray-200":data}
          )}
        >
          <div
            className={cn("flex flex-col items-center space-y-2 text-center")}
          >
            <h1 className={cn("text-2xl font-semibold tracking-tight")}>
              Update Password
            </h1>
          </div>

          <div>
            {data ? (
              <div className="flex flex-col items-center justify-center">
                <FaCheckCircle  className="align-center m-auto h-10 w-10 mt-2 mb-2 text-green-500" />{" "}

                <p className="text-green-700 text-sm text-center">Your account password is updated.Redirecting to home page...</p>

              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={cn("space-y-4")}
              >
                <div className={cn("flex flex-col")}>
                  <Label
                    htmlFor="password"
                    className={cn("text-muted-foreground mb-1 text-sm")}
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="New password"
                    {...register("password")}
                    className={cn(
                      "h-10 px-3 border rounded focus:border-blue-400 transition duration-300",
                      { "border border-red-400": errors.password }
                    )}
                  />
                  {errors.password && (
                    <small className={cn("text-red-500")}>
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <div className={cn("flex flex-col")}>
                  <Label
                    htmlFor="rePassword"
                    className={cn("text-muted-foreground mb-1 text-sm")}
                  >
                    Confirm Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    {...register("rePassword")}
                    className={cn(
                      "h-10 px-3 border rounded focus:border-blue-400 transition duration-300",
                      { "border border-red-400": errors.rePassword }
                    )}
                  />
                  {errors.rePassword && (
                    <small className={cn("text-red-500")}>
                      {errors.rePassword.message}
                    </small>
                  )}
                </div>
                <div className={cn("mt-6")}>
                  <Button
                    type="submit"
                    isLoading={isPending}
                    className={cn(
                      "w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    )}
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
