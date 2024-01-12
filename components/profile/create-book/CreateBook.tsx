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
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import FileUploader from "./FileUploader";
import { EditorState } from "draft-js";
import { formSchema, FormData } from "./utils/schema";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import { zodResolver } from "@hookform/resolvers/zod";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export function BookForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
      // description:{man: "hello"},
      pdfFile: "http://localhost:300",
      coverImage: "http://localhost:3000",
    },
  });

  function onSubmit(values: FormData) {
    console.log(values);
  }

  const { formState } = form;

  const [contentState, setContentState] = useState({});

  const onContentStateChange = (newContentState:any) => {
    setContentState(newContentState.getCurrentContent());
  };

 const x =() =>console.log(contentState)

  return (
    <>
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
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </FormControl>
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
                  <Input
                    placeholder="Fiction, Non-Fiction, ..."
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
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
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel className="text-gray-700">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Description"
                    {...field}
                    value={""}
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
              className="col-span-full bg-black text-white py-3 rounded-md hover:bg-green-600 transition duration-300 mt-10 "
            >
              Next
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}

export default BookForm;
