"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  name: z.string().regex(/^[A-Za-z][A-Za-z\s]*[A-Za-z]$/, "Invalid name"),
  email: z.string().email("Invalid email address"),
  email_verified: z.string(),
  socialLink: z.array(z.string()),
  description: z.string().max(200, "200 character maximum."),
  isSuspended: z.string().readonly(),
});

type FormData = z.infer<typeof formSchema>;

export function ProfileForm(data: FormData) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data.username,
      name: data.name,
      email: data.email,
      email_verified: data.email_verified,
      socialLink: data.socialLink,
      description: data.description,
      isSuspended: data.isSuspended,
    },
  });

  const { formState } = form;
  function onSubmit(values: FormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 bg-white rounded-lg shadow-md"
      >
        {/* First Row */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@example.com"
                  {...field}
                  className="text-sm text-green-500 font-sans p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email_verified"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Email Verified</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-sm text-green-500 font-sans p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="socialLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Social Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  {...field}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isSuspended"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Suspended</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-sm text-green-500 font-sans p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  readOnly
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Third Row */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description..."
                  {...field}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {formState.isDirty && (
          <Button
            type="submit"
            className="col-span-full bg-black text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
          >
            save
          </Button>
        )}
      </form>
    </Form>
  );
}

export default ProfileForm;
