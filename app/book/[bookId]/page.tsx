import { Axios } from "@/utils/axios";
import { StarIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/utils/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FileHeart, LibraryIcon } from "lucide-react";
import HTMLViewer from "@/components/showless/Showless";


async function page({ params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  // Let's assume you fetch book details from an API here.

  // Placeholder data for testing
  const title = "Rich dad poor dad";
  const coverImage = "http://localhost:3000/cover.jpeg";
  const rating = { value: 4.5, total: 1000 };
  const description = "<h1>Hello this is description</h1>";
  const price = 200;
  const contentList = [
    { chapter: 1, title: "How to get debt from financials.", pageNo: 1 },
    { chapter: 2, title: "How to get debt from financials.", pageNo: 1 },
    { chapter: 3, title: "How to get debt from financials.", pageNo: 1 },
    { chapter: 4, title: "How to get debt from financials.", pageNo: 1 },
    { chapter: 5, title: "How to get debt from financials.", pageNo: 1 },
  ];
  const author = "Prakash Shahi";
  const publishedAt = "2023-01-01";

  // Function to generate dummy description
  const generateDummyDescription = () => {
    const paragraphs = Array.from(
      { length: 5 },
      (_, index) =>
        `<p key=${index} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut libero in risus sodales auctor. Donec blandit volutpat lacus vel ultrices. Ut sit amet justo eu orci aliquam dapibus ac eu risus.</p>`
    );
    return paragraphs.join("");
  };

  // Assign dummy description to the actual description
  const generatedDescription = generateDummyDescription();

  return (
    <>
      <section className="text-gray-700 body-font overflow-hidden bg-gray-100">
        <div className="container px-5 py-4 mx-auto">
          <div className="lg:w-4.5/5 mx-auto flex flex-row flex-wrap-reverse items-center justify-center bg-white p-8 rounded-lg shadow-md">
            <Image
              alt={title}
              width={350}
              height={500}
              className="lg:w-2/5 sm:w-full h-fit object-cover object-center rounded border border-gray-300"
              src="http://localhost:3000/cover.jpeg"
            />
            <div className="lg:w-3/5 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <small className="text-sm title-font text-gray-500 tracking-widest">
                By {author}
              </small>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {title}
              </h1>
              <div className="flex items-center mb-4">
                {[...Array(Math.floor(rating.value))].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-500" />
                ))}
                {[...Array(5 - Math.floor(rating.value))].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-gray-300" />
                ))}
                <span className="text-gray-600 ml-3">
                  {rating.value} Reviews({rating.total})
                </span>
              </div>
              
              <Accordion type="single"  collapsible>
               
               <AccordionItem value="item-1" >
                  <AccordionTrigger>View Content</AccordionTrigger>
                  {contentList.map((item , index)=>

                  <AccordionContent key={index}>
                    {item.chapter}{" "}{item.title}{" "} {item.pageNo}
                  </AccordionContent>
                               )}

                </AccordionItem>
             
              </Accordion>
            

             <HTMLViewer htmlContent={generatedDescription}/>

              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Published: {publishedAt}</span>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Format Available</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                      <option>Pdf</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-green-600">
                  Rs. {price.toFixed(2)}
                </span>
                <Button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                  Buy
                </Button>
                <Button className=" hover:text-white hover:bg-green-500 rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                   <FileHeart />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
