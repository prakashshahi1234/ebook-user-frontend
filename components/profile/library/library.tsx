import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { truncateString } from "@/utils/shortPara";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditBook from "./edit-book/EditBook";
import { BookSchemaType } from "./utils/schema";
import { toast } from "sonner";

function Library() {
  const { data, isLoading } = useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      const response = await Axios.get("/get-all-book-author");
      return response.data;
    },
  });

  const deleteBookMutation = useMutation({
    mutationKey: ["deleteBook"],
    mutationFn: async (bookId: string) => {
      const response = await Axios.patch(`/delete-book/${bookId}`);
      return response.data;
    },
  });

  const unpublishMutation = useMutation({
    mutationKey: ["deleteBook"],
    mutationFn: async (bookId: string) => {
      const response = await Axios.patch(`/unpublish-book/${bookId}`);
      return response.data;
    },
  });

  const loadBookMutation = useMutation({
    mutationKey: ["loadBook"],
    mutationFn: async ({ _id, key }: { _id: string; key: string }) => {
      const response = await Axios.get(`/load-book/${_id}`);
      return response.data;
    },
  });

  const deleteBook = (bookId: string) => {
    deleteBookMutation.mutate(bookId, {
      onSuccess: () => {
        window.location.reload();
        toast.success("Updated.")
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const unpublishBook = (bookId: string) => {
    unpublishMutation.mutate(bookId, {
      onSuccess: () => {
        window.location.reload()
        toast.success("Updated.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const getBookSignedUrl = (_id: string, key: string) => {
    loadBookMutation.mutate(
      { _id, key },
      {
        onSuccess: (result) => {
          console.log(result);
          window.location.href = result.url;
          toast.success("Book loaded successfully");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  if (isLoading) return <p>Loading ......</p>;

  const books: BookSchemaType[] = data?.Books || [];

  const wellbook = books?.filter(
    (item: any) =>
      !item.unPublished &&
      !item.isSuspended.suspended &&
      !item.isDeleted.deleted
  );
  const suspended = books?.filter((item: any) => item.isSuspended.suspended);
  const deleted = books?.filter((item: any) => item.isDeleted.deleted);
  const unpublished = books?.filter((item: any) => item.unPublished);

  return (
    <div className="w-fit flex flex-row">
      <Table>
        <TableCaption>Books Information</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S. N.</TableHead>
            <TableHead>Cover Image</TableHead>
            <TableHead>id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6}>well books ({wellbook?.length})</TableCell>
          </TableRow>

          {wellbook.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={book.coverImageUrl}
                  height={50}
                  width={50}
                  alt={book.title}
                />
              </TableCell>
              <TableCell>{book.bookId}</TableCell>

              <TableCell title={book.title}>
                {truncateString(book.title, 50, 30)}
              </TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>Rs. {book.price}</TableCell>
              <TableCell title={book.description}>
                {truncateString(book.description, 100, 30)}
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <DotsVerticalIcon />
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-2 bg-gray-200 flex flex-col">
                    <Button
                      className=""
                      onClick={() => {
                        getBookSignedUrl(book._id, book.url);
                      }}
                    >
                      View
                    </Button>

                    <EditBook book={book} />
                    <Button
                      onClick={() => {
                        deleteBook(book.bookId);
                      }}
                      className=""
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        unpublishBook(book.bookId);
                      }}
                      className="mt-1"
                    >
                      unpublish
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={6}>
              Unpublished books ({unpublished?.length})
            </TableCell>
          </TableRow>

          {unpublished.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={book.coverImageUrl}
                  height={50}
                  width={50}
                  alt={book.title}
                />
              </TableCell>
              <TableCell>{book.bookId}</TableCell>

              <TableCell title={book.title}>
                {truncateString(book.title, 50, 30)}
              </TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>Rs. {book.price}</TableCell>
              <TableCell title={book.description}>
                {truncateString(book.description, 100, 30)}
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <DotsVerticalIcon />
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-2 bg-gray-200 flex flex-col">
                    <Button
                      className=""
                      onClick={() => {
                        getBookSignedUrl(book._id, book.url);
                      }}
                    >
                      View
                    </Button>

                    <EditBook book={book} />
                  
                    <Button
                      onClick={() => {
                        unpublishBook(book.bookId);
                      }}
                      className="mt-1"
                    >
                      Publish
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={6}>deleted books ( {deleted.length})</TableCell>
          </TableRow>
          {deleted.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={book.coverImageUrl}
                  height={50}
                  width={50}
                  alt={book.title}
                />
              </TableCell>
              <TableCell>{book.bookId}</TableCell>

              <TableCell title={book.title}>
                {truncateString(book.title, 50, 30)}
              </TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>Rs. {book.price}</TableCell>
              <TableCell title={book.description}>
                {truncateString(book.description, 100, 30)}
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <DotsVerticalIcon />
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-2 bg-gray-200 flex flex-col">
                    <Button
                      className=""
                      onClick={() => {
                        getBookSignedUrl(book._id, book.url);
                      }}
                    >
                      View
                    </Button>

                    <Button
                      onClick={() => {
                        deleteBook(book.bookId);
                      }}
                      className=""
                    >
                      Back to live
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={6}>
              Suspended books ({suspended?.length})
            </TableCell>
          </TableRow>

          {suspended.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={book.coverImageUrl}
                  height={50}
                  width={50}
                  alt={book.title}
                />
              </TableCell>
              <TableCell>{book.bookId}</TableCell>

              <TableCell title={book.title}>
                {truncateString(book.title, 50, 30)}
              </TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>Rs. {book.price}</TableCell>
              <TableCell title={book.description}>
                {truncateString(book.description, 100, 30)}
              </TableCell>
              <TableCell>
                {/* <Popover>
                  <PopoverTrigger>
                    <DotsVerticalIcon />
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-2 bg-gray-200 flex flex-col">
                    <Button
                      className=""
                      onClick={() => {
                        getBookSignedUrl(book._id, book.url);
                      }}
                    >
                      View
                    </Button>

                    <EditBook book={book} />
                    <Button
                      onClick={() => {
                        deleteBook(book.bookId);
                      }}
                      className=""
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        unpublishBook(book.bookId);
                      }}
                      className="mt-1"
                    >
                      unpublish
                    </Button>
                  </PopoverContent>
                </Popover> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Library;
