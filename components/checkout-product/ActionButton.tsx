"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Axios } from "@/utils/axios";
import { useCart } from "@/hooks/useCart";
import { Toaster, toast } from "sonner";
import { BookType } from "@/types/producTypes";

const ActionButton = ({ book }: { book: BookType }) => {
  const router = useRouter();

  const addTocartMutation = useMutation({
    mutationKey: ["addTocart"],
    mutationFn: async (_id: string) => {
      const response = await Axios.post(`/cart/${_id}`);
      return response;
    },
  });
  const clearCartMutation = useMutation({
    mutationKey: ["clearcart"],
    mutationFn: async (data: string) => {
      const response = await Axios.delete("/cart/delete");
      return response.data;
    },
  });
  const { addItem, clearCart } = useCart();

  const addToCart = (book: BookType) => {
    addTocartMutation.mutate(book._id, {
      onSuccess: (result) => {
        // for local state.
        const data = {
          _id: book._id,
          author: book.author,
          title: book.title,
          price: book.price,
          coverImageUrl: book.coverImageUrl,
        };

        if (!result.data.isAlready) {
          toast.success("Added.");
          addItem(data);
          return;
        }
        toast.success("Already in cart.");
      },

      onError: (error) => {
        try {
          //  @ts-ignore
          if (error?.response?.data.redirectUri) {
            //  @ts-ignore
            router.replace(error.response.data.redirectUri);
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const readNow = (book: BookType) => {
    const data = "";
    clearCartMutation.mutate(data, {
      onSuccess: () => {
        clearCart();

        addTocartMutation.mutate(book._id, {
          onSuccess: (result) => {
            // for local state.
            const data = {
              _id: book._id,
              author: book.author,
              title: book.title,
              price: book.price,
              coverImageUrl: book.coverImageUrl,
            };

            if (!result.data.isAlready) {
              addItem(data);
            }

            router.push("/checkout/");
          },

          onError: (error) => {
            try {
              //  @ts-ignore
              if (error?.response?.data.redirectUri) {
                //  @ts-ignore
                router.replace(error.response.data.redirectUri);
              }
            } catch (error) {
              console.log(error);
            }
          },
        });
      },
      onError: (error) => {
        try {
          //  @ts-ignore
          if (error?.response?.data.redirectUri) {
            toast.info("Please login to perform this operation.")
            //  @ts-ignore
            router.replace(error.response.data.redirectUri);
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  return (
    <div className="flex flex-row items-center justify-around">
      <Button
        onClick={() => {
          readNow(book);
        }}
        className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
      >
        Buy
      </Button>
      <Button
        onClick={() => {
          addToCart(book);
        }}
        className="m-3"
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ActionButton;
