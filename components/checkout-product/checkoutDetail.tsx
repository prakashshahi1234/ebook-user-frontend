"use client"
import React from 'react'

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '../ui/button';

interface TableData {
    cartArray: {
      title: string;
      price: number;
      cover: string;
      bookId: string;
    }[];
  }
  
  interface CheckOutTableProps {
    cartArray: TableData["cartArray"];
  }


function CheckoutDetail({cartArray}:CheckOutTableProps) {


    const totalPrice = cartArray.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="w-full md:w-2/6 p-3">
    <div className="w-full">
      <div className="flex flex-row justify-between mb-4">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-semibold"> Rs. {" "}{totalPrice}</p>
      </div>
      <div>
        <p className="text-muted-foreground text-sm mb-2">Payment Method</p>
        <RadioGroup defaultValue="esewa" className="flex flex-row space-x-2">
          <div className="flex items-center">
            <RadioGroupItem value="esewa" id="option-one" />
            <Label htmlFor="option-one" className="text-sm pl-3">Esewa</Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="khalti" id="option-two" />
            <Label htmlFor="option-two" className="text-sm pl-3">Khalti</Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="card" id="option-three" />
            <Label htmlFor="option-three" className="text-sm pl-3">Card</Label>
          </div>
        </RadioGroup>
      </div>
      <Button className="w-full mt-4">Continue</Button>
    </div>
  </div>
  
  )
}

export default CheckoutDetail