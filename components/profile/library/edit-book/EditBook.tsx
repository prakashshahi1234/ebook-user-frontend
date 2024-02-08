import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookForm from "./EditBookForm";
import { BookSchemaType } from "../utils/schema";


const EditBook = ({ book }: { book: BookSchemaType }) => {

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex flex-col items-center justify-center w-full">
          <Button
            className="bg-blue-500 m-1 hover:bg-blue-700 w-full"
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="w-screen max-w-8/10 h-full overflow-scroll">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              <BookForm
                book={book}
                DialogueClose={<DialogTrigger/>}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBook;
