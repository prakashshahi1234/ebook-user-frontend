"use client";
import GoogleLoginButton from "@/components/auth/google-login/googleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useQuery ,useMutation, Mutation } from "@tanstack/react-query";
import { registerWithEmail } from "@/services/authentication";
import { Axios } from "@/utils/axios";
import {cn} from '@/utils/cn'
import ProfileForm from "@/components/profile/profile-setup/Profile-form";
function Register() {
  const registerMutation = useMutation({

    mutationFn: async({email , password , name}:TAuthValidatorType) =>

       await Axios.post(`/register`, {name , email , password}),

  })

  type TAuthValidatorType = z.infer<typeof AuthCredentialIsvalidator>;

  const router = useRouter();
  const AuthCredentialIsvalidator = z.object({
    
    email: z.string().email({ message: "please enter valid email." }),
    name: z
      .string()
      .trim()
      .min(2, { message: "Name should have atleast 2 alphabets" })
      .max(20 , {message:"Name should be less than 20 character."})
      .refine(
        (value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value),
        "Name should contain only alphabets"
      )
      .refine(
        (value) => /^[a-zA-Z]+\s+[a-zA-Z]+/.test(value),
        "Please enter both firstname and lastname"
      ),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 character." }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TAuthValidatorType>({
    
    resolver: zodResolver(AuthCredentialIsvalidator),
  });

  const onSubmit: SubmitHandler<TAuthValidatorType> = async(data) =>{
        
        registerMutation.mutate(data, {
          onSuccess: () => {
            toast.success("Register Successfull.");
            router.push("/login");
          },
          onError: (error: any) => {
            console.log( )
            toast.error("Register Failed" , {description:error?.response?.data?.message ||"Something went wrong.Please try again."});
          },
        });
  
  }



  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className={cn('mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]', { 'pointer-events-none': registerMutation.isPending })}>
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Register for your account
            </h1>
            <Link className="text-blue-500" href="/login">
              Already Registered? Login
            </Link>
          </div>

          <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col">
                <Label htmlFor="fullName" className=" text-muted-foreground mb-1 text-sm">
                  Name
                </Label>
                <Input
                  placeholder="Prakash Shahi"
                  {...register("name")}
                  className={cn('h-10 px-3 border rounded border-gray-300 focus:border-blue-400 transition duration-300', { 'border border-red-400': errors.name })}
                />
                {errors.name && (
                  <small className="text-red-500">{errors.name.message}</small>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="email" className="text-muted-foreground mb-1 text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="example@gmail.com"
                  {...register("email")}
                  className={cn('h-10 px-3 border rounded border-gray-300 focus:border-blue-400 transition duration-300', { 'border border-red-400': errors.email })}
                />
                {errors.email && (
                  <small className="text-red-500">{errors.email.message}</small>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="password" className=" text-muted-foreground mb-1 text-sm">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="hello123"
                  {...register("password")}
                  className={cn('border-gray-300 h-10 px-3 border rounded focus:border-blue-400 transition duration-300', { 'border border-red-400': errors.password })}
                />
                {errors.password && (
                  <small className="text-red-500">
                    {errors.password.message}
                  </small>
                )}
              </div>
              <div className="mt-6">
                <Button
                  isLoading={registerMutation.isPending}
                  type="submit"
                  className={cn('w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700')}
                >
                  Register
                </Button>
              </div>
            </form>
          </div>

          <div className="my-4 text-gray-500 text-sm flex items-center justify-center space-x-2">
            <hr className="flex-1 border-t border-gray-300" />
            <span>or</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>

          <GoogleOAuthProvider clientId="492087058595-lu60hdpe4oas6pdd8idrg1mju5kgmsd0.apps.googleusercontent.com">
            <GoogleLoginButton />
          </GoogleOAuthProvider>
          <Input/>
        </div>
      </div>
    </>
  );
}

export default Register;
