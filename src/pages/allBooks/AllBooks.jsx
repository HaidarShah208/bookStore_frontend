import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../../components/bookCard/BookCard";

function AllBooks() {
  const [books, setBooks] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://book-store-backend-gamma-neon.vercel.app/api/v1/getBooks"
        );
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    
    <div className="px-4 bg-zinc-900 min-h-[85vh] py-12">
      <h4 className="text-3xl text-yellow-100">All Books</h4>
      {loading ? (
        <div className="flex my-20 justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 mt-10 gap-2 ">
          {books &&
            books.map((items, i) => {
              return (
                <div key={i}>
                  <BookCard data={items} />
                </div>
             );
            })}
        </div>
      )}
    </div>
  );
}

export default AllBooks;
