import React from "react";
import Image from "next/image";
import { StarIcon } from "@radix-ui/react-icons";
import { Star } from "lucide-react";
import Link from "next/link";
import { truncateString } from "@/utils/shortPara";
interface Props {
  title: string;
  coverImageUrl: string;
  author: {name:string , _id:string};
  rating: {
    value: number;
    total: number;
  };
  price: number;
  publishedAt: string;
  _id:string,
  bookId:string,
}

type PropsWithStyles = Props & React.HTMLAttributes<HTMLDivElement>;

const BookCard: React.FC<PropsWithStyles> = ({
  title,
  coverImageUrl,
  author,
  rating,
  price,
  publishedAt,
  bookId,
  _id
}: PropsWithStyles) => {
  return (

    <Link href={`/book/${_id}`} className="flex-shrink-0 bg-white rounded shadow-lg hover:border border-gray-300 max-w-[400px] w-full m-2 justify-end items-end">    
      <div className={`p-2 m-2`}>    
        <Image
        src={coverImageUrl}
        alt={title}
        height={400}
        width={250}
        className="object-cover w-full rounded-md mb-4 max-h-[250px]"

      />
      <p className="text-base font-medium mb- text-justify break-all">{truncateString(title,49 ,30)}</p>
     {author.name && <p className="text-gray-600 mb-2 text-sm">By {author?.name}</p>}
      <div className="flex flex-col items-start justify-between mb-2">
      {price && <p className="text-lg font-bold text-green-600 mb-2">{"Rs. "}{price}</p>}

     {/* {rating.total &&  
      <div className=" flex flex-row items-center text-gray-700 text-sm text-yellow">
        <Star className="w-5 h-5 text-yellow-500 mr-1" />

          {rating.value} - {rating.total}
        </div>} */}
      </div>
   {publishedAt &&   <p className="text-gray-500">Published: {publishedAt}</p>}
    </div>
    </Link>
  );
};

export default BookCard;
