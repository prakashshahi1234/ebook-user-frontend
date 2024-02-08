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
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "./FileUploader";
import { formSchema, FormData } from "./utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function BookForm() {
  const [editorValue, setEditorValue] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
      url: "",
      coverImageUrl: "",
    },
  });
  const submitBookMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await Axios.post("/create-book", { ...data });
    },
  });
  function onSubmit(values: FormData) {
    submitBookMutation.mutate(values, {
      onSuccess: (result) => {
        alert("Book created successfully");
        form.reset();
      },
      onError: (error) => {
        alert("Error creating book");
        console.log(error);
      },
    });
  }

  const { setValue, getValues, formState, watch } = form;

  const getBookUrlFromUploader = (data: string) => {
    const pathname = new URL(data).pathname;
    const parts = pathname.split("/");

    // Find the index of "all-books" in the path
    const index = parts.indexOf("all-books");

    // Check if "all-books" is present and has at least three more parts
    const key =
      index !== -1 && index + 3 < parts.length
        ? `/${parts.slice(index, index + 4).join("/")}`
        : "Pattern not found in the URL";

    setValue("url", key.slice(1));
  };

  const getCoverImageUrlFromUploader = (data: string) =>
    setValue("coverImageUrl", data.split("?")[0]);

  const inputFieldStyle = cn(
    "p-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
  );

  const watchField = watch(["url", "coverImageUrl"]);

  return (
    <>
      <div className="">
        <div
          className={cn("flex flex-row flex-wrap justify-around items-start")}
        >
          <FileUploader
            sendUrl={getBookUrlFromUploader}
            uploadUrlEndPoint="/upload-book"
            maxSize={5000000}
            accepted={["application/pdf"]}
            buttonText="Upload Book"
            dragText="click here or drag pdf file here to upload book"
            title="Upload Book"
          />

          <FileUploader
            sendUrl={getCoverImageUrlFromUploader}
            uploadUrlEndPoint="/upload-pdf-cover"
            maxSize={5000000}
            accepted={["image/png", "image/jpeg", "image/jpg"]}
            buttonText="Upload Cover Image"
            dragText="click here or drag Image file here to upload."
            title="Upload Cover Image"
          />
        </div>
      </div>
      {watchField[0] && watchField[1] && (
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

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Author Name"
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
                  <FormLabel className="text-gray-700">Book Url</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={cn(
                        inputFieldStyle,
                        "border-green-500 , text-green-600"
                      )}
                      readOnly
                    />
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
                    <Input
                      {...field}
                      className={cn(
                        inputFieldStyle,
                        "border-green-500 , text-green-600"
                      )}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="col-span-full bg-black text-white py-3 rounded-md hover:bg-green-600 transition duration-300 mt-10 "
            >
              Publish Book
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}

export default BookForm;
