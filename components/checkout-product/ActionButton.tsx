"use client"

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


const ActionButton = () => {
  const cartId = localStorage.getItem("cartId");
  const router  =useRouter();
  const buy = () =>{router.push(`/checkout/${cartId}`)}
  return (
    <>
      <Button
        onClick={() => {buy()}}
        className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
      >
        Buy
      </Button>
      <Button className="m-3">Add to cart</Button>
    </>
  );
};

export default ActionButton;
