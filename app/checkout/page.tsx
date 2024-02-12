"use client"
import CheckOutTable from "@/components/checkout-product/CheckOutTable";
import React, { useEffect } from "react";
import CheckoutDetail from "@/components/checkout-product/checkoutDetail";
import { useCart } from "@/hooks/useCart";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/utils/axios";
function Page() {
  
  const cartQuery = useQuery({
    queryKey: ["initialCartState"],
    queryFn: async () => {  
      const response = await Axios.get("/cart/all");
      return response.data;
    },
  });


  useEffect(() => {
   
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
  }, [cartQuery]);


  return (
    <div className="flex flex-row flex-wrap-reverse p-3">
      <div className="w-full md:w-4/6 borde">
        <CheckOutTable  />
      </div>
       <CheckoutDetail
        
       />
    </div>
  );
}

export default Page;
