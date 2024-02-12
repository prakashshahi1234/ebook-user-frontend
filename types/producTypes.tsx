interface User {
  _id: string;
  name:string
  // Add other user fields as needed
}

export interface BookType {
  _id: string;
  bookId: string;
  title: string;
  author: User;
  price: number;
  category: string |'fiction' | 'non-fiction' | 'science-fiction' | 'mystery' | 'romance'; // Add more categories if needed
  coverImageUrl: string;
  createdAt: string;
  description?:string;
}