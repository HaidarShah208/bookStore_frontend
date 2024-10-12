import React, { useEffect, useState } from "react";
import instance from "../../utils/instance";
import BookCard from "../../components/bookCard/BookCard";
import save from '../../assets/save.png'
const Favourites = () => {
  const [books, setBooks] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await instance.get(`/getfavourteBooks`);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error.response.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

// Function to handle removing book from state
const handleRemoveBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  };
  
  return (
    <>
    {loading ? (
      <div className="flex my-20 justify-center items-center">
        <span className="loader"></span>
      </div>
    ) : (
      <>
        {books.length === 0 ? (
        <div className="h-screen">
        <div className="flex justify-center h-[100%] text-center flex-col">
          <h1 className="text-2xl md:text-6xl font-semibold text-zinc-400">
        No Favourites Yet
          </h1>
          <img src={save} alt="/" className="lg:h-[30vh] h-auto object-contain " />
      </div>
      </div>
        ) : (
          <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4">
            {books.map((item, key) => (
              <div key={key} className="mb-3">
                <BookCard data={item} favourite={true} onRemove={handleRemoveBook} />
              </div>
            ))}
          </div>
        )}
      </>
    )}
  </>
);
};

export default Favourites;
