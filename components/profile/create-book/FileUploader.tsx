import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

const FileUploader = ({ accepted, buttonText, dragText , title }: { accepted: string; buttonText: string; dragText: string  , title:string}) => {
  const [file, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
 const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
 }
  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <form className="flex flex-col items-center" onSubmit={(e)=>{handleSubmit(e)}}>
          <div
            {...getRootProps()}
            className="border rounded-md border-gray-300 h-40 w-60 flex flex-col justify-center items-center mx-auto mb-6 p-4"
          >
            <Label className="text-lg font-semibold mb-2">{title}</Label>
            <Input {...getInputProps()} type="file" accept={accepted} className="hidden" />
            {isDragActive ? (
              <p className="text-gray-600">Drop the files here ...</p>
            ) : (
              <>
                <p className={cn("text-gray-600 text-sm text-center w-full", { "text-green-500": file })}>
                  {file ? "Uploaded" : dragText}
                </p>
              </>
            )}
          </div>

          {file && (
            <div className="mt-4 w-auto mx-auto">
              <embed
                title={title}
                src={URL.createObjectURL(file)}
                className="h-[400px] min-w-[400px] rounded"
              ></embed>
            </div>
          )}

          <Button type="submit" className={cn("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full" ,{ "bg-green-500":file})}>
            {buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FileUploader;
