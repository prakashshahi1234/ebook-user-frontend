import BookCard from "@/components/book-card/BookCard";
import { BookType } from "@/types/producTypes";
import { Axios } from "@/utils/axios";
import PDFViewer from "@/components/pdfview/PdfViewer";
import LoadCart from "@/components/loadcard/loadCart";
export default async function Home() {
  
  const query = await Axios.post("/get-books");

  const books = query.data.books;

  if (!books) return <div>Having problem in load books.</div>;

  return (
    <main className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-h-screen p-4 justify-start items-end ">
      {books.map((book: BookType, index: number) => (
        <BookCard
          bookId={book.bookId}
          key={index}
          title={book.title}
          // @ts-ignore
          author={book.author}
          _id={book._id}
          price={book.price}
          // @ts-ignore
          publishedAt={new Date(book?.createdAt).toDateString()}
          coverImageUrl={book.coverImageUrl}
          rating={{ value: 0, total: 0 }}
        />
      ))}
        {books.map((book: BookType, index: number) => (
        <BookCard
          bookId={book.bookId}
          key={index}
          title={book.title}
          // @ts-ignore
          author={book.author}
          _id={book._id}
          price={book.price}
          // @ts-ignore
          publishedAt={new Date(book?.createdAt).toDateString()}
          coverImageUrl={book.coverImageUrl}
          rating={{ value: 0, total: 0 }}
        />
      ))}  {books.map((book: BookType, index: number) => (
        <BookCard
          bookId={book.bookId}
          key={index}
          title={book.title}
          // @ts-ignore
          author={book.author}
          _id={book._id}
          price={book.price}
          // @ts-ignore
          publishedAt={new Date(book?.createdAt).toDateString()}
          coverImageUrl={book.coverImageUrl}
          rating={{ value: 0, total: 0 }}
        />
      ))}
     

      <LoadCart/>   
     </main>
  );
}
