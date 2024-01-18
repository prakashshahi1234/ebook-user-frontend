import CheckOutTable from "@/components/checkout-product/CheckOutTable";
import React from "react";
import CheckoutDetail from "@/components/checkout-product/checkoutDetail";
function Page({ params }: { params: { cartId: string } }) {
  const array = [
    {
      cover: "http://localhost:3000/cover.jpeg",
      title: "Rich Dad Poor Dad",
      price: 299,
      bookId: "1234141415",
    },
    {
      cover: "http://localhost:3000/cover.jpeg",
      title: "Rich Dad Poor Dad",
      price: 299,
      bookId: "123414115",
    },
    {
      cover: "http://localhost:3000/cover.jpeg",
      title: "Rich Dad Poor Dad",
      price: 299,
      bookId: "123414141",
    },
  ];


  return (
    <div className="flex flex-row flex-wrap-reverse p-3">
      <div className="w-full md:w-4/6 borde">
        <CheckOutTable cartArray={array} />
      </div>
       <CheckoutDetail
         cartArray={array}
       />
    </div>
  );
}

export default Page;
