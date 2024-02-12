"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Cross1Icon, DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { bookItem, useCart } from "@/hooks/useCart";
import { BookType } from "@/types/producTypes";
import { Axios } from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PercentCircleIcon } from "lucide-react";
import { toast } from "sonner";

function CheckOutTable() {
  const { books } = useCart();
  const totalPrice = books.reduce((acc, curr) => acc + curr.price, 0);
  const { updateCart } = useCart();
  const updateCartMutation = useMutation({
    mutationKey: ["updatecard"],
    mutationFn: async (book: bookItem) => {
      return await Axios.patch(`/cart/${book._id}`);
    },
  });

  const updateCartFull = (data: bookItem) => {
    updateCartMutation.mutate(data, {
      onSuccess: () => {
        updateCart(data);
        toast.success("Removed.");
      },
      onError: (error) => {
        alert("error");
      },
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table className="lg:w-full">
        <TableCaption>Books</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>More</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books?.map(({ coverImageUrl, price, title, _id }) => (
            <TableRow key={_id}>
              <TableCell className="font-medium">
                <Image
                  src={coverImageUrl}
                  width={100}
                  height={100}
                  className="w-20 lg:w-25 h-auto"
                  alt={title}
                />
              </TableCell>
              <TableCell className="whitespace-nowrap">{title}</TableCell>
              <TableCell className="whitespace-nowrap">Rs. {price}</TableCell>
              <TableCell className="whitespace-nowrap">
                <Popover>
                  <PopoverTrigger>
                    <DotsVerticalIcon />
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-2 bg-gray-200">
                    <div className="flex flex-row m-auto mb-2 items-center relative">
                      <Input
                        type="text"
                        placeholder="Code"
                        className="w-full lg:w-full h-10 focus:outline-none"
                      />
                      <PercentCircleIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-none text-black h-7" />
                    </div>

                    <Button
                      className="w-full bg-red-500 hover:bg-red-600"
                      onClick={() =>
                        updateCartFull({ coverImageUrl, price, title, _id })
                      }
                    >
                      Remove Book
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="whitespace-nowrap">
              Rs. {totalPrice}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default CheckOutTable;
