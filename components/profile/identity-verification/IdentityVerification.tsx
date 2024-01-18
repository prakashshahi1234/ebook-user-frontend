// Import necessary components and libraries
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/utils/cn";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import { toast } from "sonner";

// Define the schema for the new set of fields
const formSchema = z.object({
  name: z.string().trim().refine((val) => val !== '', { message: 'Name is required' }),
  country: z.string().trim().refine((val) => val !== '', { message: 'Country is required' }),
  province: z.string().trim().refine((val) => val !== '', { message: 'Province is required' }),
  district: z.string().trim().refine((val) => val !== '', { message: 'District is required' }),
  municipality: z.string().trim().refine((val) => val !== '', { message: 'Municipality is required' }),
  wardNo: z.string().trim().refine((val) => val !== '', { message: 'Ward No is required' }),
  toleName: z.string().trim().refine((val) => val !== '', { message: 'Tole Name is required' }),
  profession: z.string().trim().refine((val) => val !== '', { message: 'Profession is required' }),
  isVerified : z.boolean(),
  isSubmitted:z.boolean(),
});


type FormData = z.infer<typeof formSchema>;

// Define the form component
export function IdentityVerification(data: FormData) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name || "",
      country: data.country || "",
      province: data.province || "",
      district: data.district ||"",
      municipality: data.municipality || "",
      wardNo: data.wardNo || "",
      toleName: data.toleName || "",
      profession: data.profession || "",
      isVerified:data.isVerified || false,
      isSubmitted:data.isSubmitted || false,
    },
  });

  const { formState } = form;

  const identityMutation = useMutation({
    mutationFn: async(values: FormData) => {
      return Axios.post("/submit-identity" ,{...values} )
    }
  })

  function onSubmit(values: FormData) {
    identityMutation.mutate(values ,{
      onSuccess:()=>[
          alert("Identity submitted successfully")
      ],
      onError:()=>{
     alert("Identity submission failed")
      
      }
    })
  }


  return (
    <Form {...form}>
              {data.isSubmitted && <div className="p-3"><p className="text-sm margin-auto w-fit text-blue-500">Your identity is Submitted.It may take 2-4 days to look and verify.</p></div>}
             {data.isVerified  && <div className="p-3"><p className="text-sm margin-auto w-fit text-green-500">Your identity is verified.</p></div>}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn({"pointer-events-none":data.isVerified},"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 bg-white rounded-lg shadow-md")}
      >
        {/* First Row */}
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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Country</FormLabel>
              <FormControl>
                <Input
                  placeholder="Country"
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
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Province</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder=" Select Province" />
                  </SelectTrigger>
                  <SelectContent  defaultValue={field.value}>
                    <SelectItem value="Karnali">Karnali</SelectItem>
                    <SelectItem value="Bagmati">Bagmati</SelectItem>
                    <SelectItem value="Gandaki">Gandaki</SelectItem>
                    <SelectItem value="Lumbini">Lumbini</SelectItem>
                    <SelectItem value="Sudur Paschim">Sudur Paschim</SelectItem>
                    <SelectItem value="Madhya Pardesh">Madhya Pardesh</SelectItem>
                    <SelectItem value="Koshi">Koshi</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">District</FormLabel>
              <FormControl>
                <Input
                  placeholder="District"
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
  name="municipality"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-gray-700">Municipality</FormLabel>
      <FormControl>
        <Input
          placeholder="Municipality"
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
  name="wardNo"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-gray-700">Ward No</FormLabel>
      <FormControl>
        <Input
          placeholder="Ward No"
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
  name="toleName"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-gray-700">Tole Name</FormLabel>
      <FormControl>
        <Input
          placeholder="Tole Name"
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
  name="profession"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-gray-700">Profession</FormLabel>
      <FormControl>
        <Input
          placeholder="Profession"
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
            Save
          </Button>
        )}
      </form>
    </Form>
  );
}

export default IdentityVerification;
