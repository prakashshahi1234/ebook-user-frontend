import React from 'react';
import BookCard from '@/components/book-card/BookCard';
import { useQuery } from '@tanstack/react-query';
import { Axios } from '@/utils/axios';

function Library() {
    const { data, isLoading } = useQuery({
        queryKey: ["book"],
        queryFn: async () => {
            // Changed the endpoint to a more standard format
            const response = await Axios.get("/get-all-book-author");
            return response.data; // Assuming the data is directly in the response's data property
        }
    });

    if (isLoading) return <p>Loading ......</p>;

    // Use optional chaining (?.) to safely access nested properties
    console.log(data?.Books);

    return (
        <div className='w-fit flex flex-row'>
            {/* Use optional chaining (?.) for safer mapping */}
            {data?.Books?.map((item: any) => (
                <BookCard key={item.id} 
                 title={item?.title}
                 coverImage={item?.coverImageUrl}
                 author={item?.author}
                 price={item?.price}
                 rating={{total:5 , value:0}}
                 publishedAt={item?.createdAt}
                />
            ))}
        </div>
    );
}

export default Library;
