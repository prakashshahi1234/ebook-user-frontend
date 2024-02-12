import { Axios } from "@/utils/axios";
import { StarIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/utils/cn";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FileHeart, LibraryIcon } from "lucide-react";
import ShowLessMore from "@/components/showless/Showless";
import ActionButton from "@/components/checkout-product/ActionButton";
import { BookType } from "@/types/producTypes";

async function page({ params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  const query = await Axios.get(`/get-book/${bookId}`);
  const book: BookType = query.data.book;

  // Placeholder data for testing
  const title = book.title;
  const coverImage = book.coverImageUrl;
  const rating = { value: 0, total: 0 };
  const description = book.description;
  const price = book.price;
  const author = book.author;
  const publishedAt = new Date(book.createdAt).toDateString();

  const contentList = [
    { chapter: 1, title: "How to get debt from financials.", pageNo: 1 },
    { chapter: 2, title: "How to get debt from financials.", pageNo: 1 },
    { chapter: 3, title: "How to get debt from financials.", pageNo: 1 },
    { chapter: 4, title: "How to get debt from financials.", pageNo: 1 },
    { chapter: 5, title: "How to get debt from financials.", pageNo: 1 },
  ];

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-gray-300 relative">
    <div className="container px-5 py-4 mx-auto sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
      <div className="lg:w-4.5/5 mx-auto flex flex-col md:flex-row md:top-10 lg:flex-row top-0 lg:top-10 flex-wrap-reverse items-end justify-center bg-white p-8 rounded-lg shadow-md">
        <Image
          alt={title || ""}
          width={350}
          height={500}
          className="lg:w-2/6 md:w-1/2 sm:w-full sm:mt-3 h-fit object-cover object-center rounded border border-gray-300 sticky top-0 lg:top-10"
          src={coverImage}
        />
  
        <div className="lg:w-4/6 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 relative">
          <small className="text-sm title-font text-gray-500 tracking-widest">
            By {author.name}
          </small>
          <h1 className="text-gray-900 text-base text-justify title-font font-bold mb-2">
            {title}
          </h1>
          <div className="flex items-center mb-2">
            {[...Array(Math.floor(rating.value))].map((_, i) => (
              <StarIcon key={i} className="w-3 h-3 text-yellow-500" />
            ))}
            {[...Array(5 - Math.floor(rating.value))].map((_, i) => (
              <StarIcon key={i} className="w-3 h-3 text-gray-300" />
            ))}
            <span className="text-gray-600 ml-2 font-bold">
              {rating.value}({rating.total})
            </span>
          </div>
  
          <div
            className="description text-sm"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          ></div>
  
          <div className="flex flex-wrap justify-start mt-4 items-center pb-3 border-b-2 border-gray-200 mb-3">
            <div className="flex">
              <span className="mr-2 text-xs font-bold">
                Published: {publishedAt}
              </span>
            </div>
            <div className="flex ml-4 items-center sm:justify-start">
              <span className="mr-2 text-xs font-bold">Format Available</span>
              <div className="relative">
                <select className="rounded border appearance-none border-gray-400 py-1 focus:outline-none focus:border-red-500 text-xs pl-2 pr-8">
                  <option>Pdf</option>
                </select>
                <span className="absolute right-0 top-0 h-full w-8 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-2 h-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
  
          <div className="flex flex-row rounded fixed bottom-0 left-0 right-0  bg-black items-center justify-evenly w-full md:w-10/12 sm:w-full lg:w-11/12 xl:w-7/12 mx-auto px-2">
            <span className="title-font font-bold text-xs text-green-600">
              Rs. {price.toFixed(2)}
            </span>
            <ActionButton book={book}/>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  );
}

export default page;
