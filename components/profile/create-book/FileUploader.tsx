import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FormEvent, ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import { File } from "buffer";
import axios from "axios";
import { toast } from "sonner";

const FileUploader = ({
  maxSize,
  accepted,
  buttonText,
  dragText,
  title,
  uploadUrlEndPoint,
  sendUrl,
}: {
  maxSize: number;
  accepted: string[];
  buttonText: string;
  dragText: string;
  title: string;
  uploadUrlEndPoint: string;
  sendUrl: (data: string) => void;
}) => {
  const formSchema = z.object({
    file: z
      .any()
      .refine((file) => file[0], { message: "File is required." })
      .refine((file) => accepted.includes(file[0]?.type), {
        message: `Only ${accepted.join(",")} formats are supported.`,
      })
      .refine((file) => file[0]?.size <= maxSize, {
        message: `Maximum allowed file size is ${Math.floor(
          maxSize / (1024 * 1024)
        )} MB.`,
      }),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    formState: { errors, isDirty },
    register,
    getFieldState,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const fileUploadUrlRequestMutation = useMutation({
    mutationFn: async (data) => {
      return await Axios.get(
        // @ts-ignore
        uploadUrlEndPoint.concat(`?contentType=${data.file[0].type}`)
      );
    },
  });

  type uploadData = {
    url: string;
    file: any;
  };

  const uploadToS3 = useMutation({
    mutationFn: async (data: uploadData) => {  

       await axios.put(data.url, data.file, {
        headers: {
          'Content-Type': data.file.type,
        },
      });
    },
  });

  const { isPending  ,isSuccess} = uploadToS3;

  const onSubmit = async (data: FormData) => {
    // @ts-ignore
    fileUploadUrlRequestMutation.mutate(data, {
      onSuccess: (result) => {
        const obj = {
          url: result.data.url,
          file: data.file[0],
        };

        uploadToS3.mutate(obj, {
          onSuccess: () => {
            toast.success("uploaded successfully");
            sendUrl(result.data.url);
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div className={cn("flex justify-center items-center  bg-gray-100" , {"text-green-500  opacity-50 pointer-events-none":isSuccess})}>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label className="text-lg font-semibold mb-2">{title}</Label>
          <Input
            type="file"
            accept={accepted.join(",")}
            className=""
            {...register("file")}
            multiple={false}
          />

          {errors.file && (
            <small className={cn({ "text-red-500": errors.file })}>
              {errors?.file?.message as ReactNode}
            </small>
          )}
          <Button
            isLoading={isPending}
            type="submit"
            className={cn(
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full",
              { "bg-green-500": false }
            )}
          >
            {buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FileUploader;
