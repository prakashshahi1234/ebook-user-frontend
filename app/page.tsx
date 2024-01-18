"use client"
import BookCard from "@/components/book-card/BookCard";

export default function Home() {
  // const accessToken = cookies().get('accessToken')
  // console.log(accessToken)
  localStorage.setItem("cartId" ,"hello")
  return(
    <main className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-h-screen items-center justify-center p-4">      
      <BookCard         
          title="Rich Dad Poor Dad"
          author="Robert T. Kiyosaki"
          price={200}
          publishedAt="2022-01-01"
          coverImage="http://localhost:3000/cover.jpeg"
          rating={{value:4.5 , total:4500}}
        />
         <BookCard
          title="Rich Dad Poor Dad"
          author="Robert T. Kiyosaki"
          price={200}
          publishedAt="2022-01-01"
          coverImage="http://localhost:3000/cover.jpeg"
          rating={{value:4.5 , total:4500}}
        />
         <BookCard
          title="Rich Dad Poor Dad"
          author="Robert T. Kiyosaki"
          price={200}
          publishedAt="2022-01-01"
          coverImage="http://localhost:3000/cover.jpeg"
          rating={{value:4.5 , total:4500}}
        />
         <BookCard
          title="Rich Dad Poor Dad"
          author="Robert T. Kiyosaki"
          price={200}
          publishedAt="2022-01-01"
          coverImage="http://localhost:3000/cover.jpeg"
          rating={{value:4.5 , total:4500}}
        />
         <BookCard
          title="Rich Dad Poor Dad"
          author="Robert T. Kiyosaki"
          price={200}
          publishedAt="2022-01-01"
          coverImage="http://localhost:3000/cover.jpeg"
          rating={{value:4.5 , total:4500}}
        />
         <BookCard
          title="Rich Dad Poor Dad"
          author="Robert T. Kiyosaki"
          price={200}
          publishedAt="2022-01-01"
          coverImage="http://localhost:3000/cover.jpeg"
          rating={{value:4.5 , total:4500}}
        />
    </main>
  )
}
