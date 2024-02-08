interface User {
    _id?: string;
    name?:string
    // Add other user fields as needed
  }
  
 export interface BookType {
    _id: string;
    bookId: string;
    title: string;
    author: User;
    url: string;
    price: number;
    description: string;
    keywords?: string[];
    category: 'fiction' | 'non-fiction' | 'science-fiction' | 'mystery' | 'romance'; // Add more categories if needed
    publicationDate?: Date;
    coverImageUrl: string;
    unPublished?: boolean;
    isDeleted?: {
      deleteBy?: User;
      deleted?: boolean;
      deletedAt?: Date;
    };
    isSuspended?: {
      suspended?: boolean;
      suspenededAt?: Date;
      suspendedBy?: User;
    };
    createdAt: string;
  }
  
  