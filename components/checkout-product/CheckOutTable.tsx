"use client";
import React from "react";
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

interface TableData {
  cartArray: {
    title: string;
    price: number;
    cover: string;
    bookId: string;
  }[];
}

interface CheckOutTableProps {
  cartArray: TableData["cartArray"];
}
const removeBookFromCart = (bookId: string) => {
  // comlete this
};

function CheckOutTable({ cartArray }: CheckOutTableProps) {
  const totalPrice = cartArray.reduce((acc, curr) => acc + curr.price, 0);
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
        {cartArray?.map(({ cover, price, title, bookId }) => (
          <TableRow key={bookId}>
            <TableCell className="font-medium">
              <Image
                src={cover}
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
                  <div className="flex flex-row mb-2">
                    <Input
                      type="text"
                      placeholder="Code"
                      className="w-full lg:w-full h-10  focus:outline-none"
                    />
                    <Button className="absolute right-1 bg-blue-500  hover:bg-green-500">
                      Apply
                    </Button>
                  </div>
                  <Button
                    className="w-full bg-red-500 hover:bg-red-600"
                    onClick={() => removeBookFromCart(bookId)}
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
          <TableCell className="whitespace-nowrap">Rs. {totalPrice}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  
  );
}

export default CheckOutTable;
