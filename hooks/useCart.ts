import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type bookItem = {
  _id: string;
  author?: {name:string , _id:string};
  price: number;
  title: string;
  coverImageUrl:string
};

type CartState = {
  books: bookItem[];
  addItem: (book: bookItem) => void;
  clearCart: () => void;
  updateCart: (book: bookItem) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      books: [],
      addItem: (book) =>
        set((state) => {
          return { books: [...state.books, book] };
        }),
      updateCart: (book) =>
        set((state) => {
          return { books: state.books.filter((item) => item._id !== book._id) };
        }),

      clearCart: () => set({ books: [] }),
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
