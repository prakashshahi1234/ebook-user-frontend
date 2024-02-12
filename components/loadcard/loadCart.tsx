"use client"
import { bookItem, useCart } from '@/hooks/useCart';
import { Axios } from '@/utils/axios';
import {  useQuery } from '@tanstack/react-query';
import React from 'react'

export default function LoadCart() {
    const {addItem}=useCart()
    const cartQuery = useQuery({
        queryKey: ["initialCartState"],
        queryFn: async () => {  
          const response = await Axios.get("/cart/all");
          return response.data;
        },
        retry:2
      });
    
    
      React.useEffect(() => {
       
        const setInititalCartLocalFromRemote = ()=>{
         
        if (cartQuery.data) {
          const  obj = {books:cartQuery.data.books}
          const data = {state:obj}    
          
          localStorage.setItem(
              "cart-storage",
              JSON.stringify(data)
            );
        }
        
      }
      setInititalCartLocalFromRemote()
      }, [cartQuery ]);
  return (
    <div>
      
    </div>
  )
}
