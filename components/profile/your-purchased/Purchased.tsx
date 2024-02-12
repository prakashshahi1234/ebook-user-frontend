import BookCard from '@/components/book-card/BookCard';
import { Axios } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function Purchased() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["loadPurchased"],
        queryFn: async () => {
          const response = await Axios.get("/get-purchased");
          return response.data?.books;
        },
      });

    if(isLoading) return <p>Loding...</p>

    // if(error) return <p>error</p>
  
  return (
    <div className="flex flex-row items-end justify-around flex-wrap">
        {!data || data.length===0 && <p>Book is not available.</p>}
        {data && data.map((item: any, index:number)=>{
            return (
            <div key={index}>
            <BookCard {...item} price={null} rating={{}} />
            </div>)
        })}
    </div>
  )
}
