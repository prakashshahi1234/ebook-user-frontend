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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the schema for the PaymentSetup fields
const formSchema = z.object({
  bankName: z.string().trim().refine((val) => val !== '', { message: 'Bank Name is required' }),
  branch: z.string().trim().refine((val) => val !== '', { message: 'Branch is required' }),
  accountHolderName: z.string().trim().refine((val) => val !== '', { message: 'Account Holder Name is required' }),
  accountNumber: z.string().trim().refine((val) => val !== '', { message: 'Account Number is required' }),
});

type PaymentSetupFormData = z.infer<typeof formSchema>;

// Define the form component
export function PaymentSetupForm(data: PaymentSetupFormData) {
  const form = useForm<PaymentSetupFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankName: data.bankName,
      branch: data.branch,
      accountHolderName: data.accountHolderName,
      accountNumber: data.accountNumber,
    },
  });

  const { formState } = form;

  function onSubmit(values: PaymentSetupFormData) {
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
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Bank Name</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nic">Nic Asia</SelectItem>
                    <SelectItem value="bok">Bank of kathmandu</SelectItem>
                    <SelectItem value="nabil">Nabil</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Branch</FormLabel>
              <FormControl>
                <Input
                  placeholder="Branch"
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
          name="accountHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Account Holder Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Account Holder Name"
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
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Account Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Account Number"
                  {...field}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Add any other fields if needed */}
        
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

export default PaymentSetupForm;
