"use client"
import React, { useState } from 'react'
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '../ui/button';
import { useCart } from '@/hooks/useCart';
import { useMutation } from '@tanstack/react-query';
import { Axios } from '@/utils/axios';
import { EsewaPayment, submitEsewaPayment } from '@/utils/esewa';


function CheckoutDetail() {
  
   
    const {books} = useCart()

    const totalPrice = books.reduce((acc, curr) => acc + curr.price, 0);
    const [transactionUuid, setUuid] = useState(null);
    const [signature, setSignature] = useState(null);
    const [khaltiPaymentUrl, setKhaltiPayUrl] = useState(null);

    const purchaseMutation = useMutation({
      mutationKey: ["purchase"],
      mutationFn: async (data: string) => {
        return (await Axios.get(`/purchase/${data}`)).data;
      },
    });
  
    const purchase = (paymentMethod: string) => {
      purchaseMutation.mutate(paymentMethod, {
        onSuccess: (result) => {
          if (paymentMethod === "ESEWA") {
            setUuid(result.transactionUuid);
            setSignature(result.signature);
            setKhaltiPayUrl(null)
            const data:EsewaPayment ={
               amount:totalPrice,
               transactionUuid:result.transactionUuid,
               signature:result.signature,
               productDeliveryCharge:0,
               productServiceCharge:0,
               taxAmount:0,
               totalAmount:totalPrice,
            }
            submitEsewaPayment(data)
          } else if (paymentMethod === "KHALTI") {
            window.location.href = result.payment_url
          }
        },
        onError: (error) => {
          console.log(error);
          alert("error")
        },
      });
    };
    



  return (
    <div className="w-full md:w-2/6 p-3">
    <div className="w-full">
      <div className="flex flex-row justify-between mb-4">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-semibold"> Rs. {" "}{totalPrice}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-sm mb-2">Payment Method</p>
        <Button className="w-full mt-4" onClick={()=>{purchase("KHALTI")}}>Pay by Kahalti</Button>
        <Button className="w-full mt-4" onClick={()=>{purchase("ESEWA")}}>Pay by Esewa</Button>




      </div>
    </div>
  </div>
  
  )
}

export default CheckoutDetail