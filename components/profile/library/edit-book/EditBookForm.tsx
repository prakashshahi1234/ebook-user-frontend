// Import necessary components and libraries
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "../../create-book/FileUploader";
import { formSchema } from "@/components/profile/create-book/utils/schema";
import { BookSchemaType } from "@/components/profile/library/utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import { DialogTrigger } from "@/components/ui/dialog";
import ReactQuill from "react-quill";
export function BookForm({
  book,
  DialogueClose,
}: {
  book: BookSchemaType;
  DialogueClose: React.RefAttributes<HTMLButtonElement>;
}) {
  const form = useForm<BookSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...book,
      keywords: book.keywords.toString(),
      bookId: book.bookId,
    },
  });

  const submitBookMutation = useMutation({
    mutationFn: async (data: BookSchemaType) => {
      return await Axios.patch(`/update-book/${data.bookId}`, { ...data });
    },
  });
  

  function onSubmit(values: BookSchemaType) {
    submitBookMutation.mutate(values, {
      onSuccess: (result) => {
        alert("Book Updated successfully");
      },
      onError: (error) => {
        alert("Error Updating book");
        console.log(error);
      },
    });
  }

  const { setValue } = form;
  const { isSuccess, isPending } = submitBookMutation;

 

  const getCoverImageUrlFromUploader = (data: string) =>
    setValue("coverImageUrl", data.split("?")[0]);

  const inputFieldStyle = cn(
    "p-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-black"
  );

  return (
    <div
      className={cn({
        "opacity-75 pointer-events-none": isSuccess || isPending,
      })}
    >
      <div>
        <div
          className={cn("flex flex-row flex-wrap justify-around items-start")}
        >
          <FileUploader
            sendUrl={getCoverImageUrlFromUploader}
            uploadUrlEndPoint="/upload-pdf-cover"
            maxSize={5000000}
            accepted={["image/png", "image/jpeg", "image/jpg"]}
            buttonText="upload new cover image"
            dragText="click here or drag Image file here to upload."
            title="change Cover image"
          />
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 bg-white rounded-lg shadow-md"
        >
          {/* First Row */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Book Title"
                    {...field}
                    className={inputFieldStyle}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {/* Third Row */}
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Keywords</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Keyword1, Keyword2, ..."
                    {...field}
                    className={inputFieldStyle}
                  />
                </FormControl>
                <FormDescription className="" title="hello">
                  Keyword1, keyword2,....
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="science-fiction">
                        Science Fiction
                      </SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Price (NPR)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    className={inputFieldStyle}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel className="text-gray-700">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter Description"
                    className={inputFieldStyle}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          /> */}

<FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel className="text-gray-700">Description</FormLabel>
                  <FormControl>
                    <ReactQuill
                      {...field}
                      theme="snow"
                      className={cn(inputFieldStyle)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-gray-700">Description</FormLabel>
                <FormControl>
                  <Input {...field} className={inputFieldStyle} readOnly />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImageUrl"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-gray-700">Book Cover</FormLabel>
                <FormControl>
                  <Input {...field} className={inputFieldStyle} readOnly />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {!isSuccess ? (
            <Button
              isLoading={isPending}
              type="submit"
              className="col-span-full w-full bg-black text-white py-3 rounded-md hover:bg-green-600 transition duration-300 mt-10 "
            >
              Save Book
            </Button>
          ) : (
            <DialogTrigger className="col-span-full w-full pointer-events-auto">
              <Button type="reset" className="w-full bg-gray-300 text-black py-3 rounded-md hover:bg-green-600 transition duration-300 mt-10 ">
                Close
              </Button>
            </DialogTrigger>
          )}
        </form>
      </Form>
    </div>
  );
}

export default BookForm;
