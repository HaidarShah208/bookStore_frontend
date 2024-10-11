import React, { useEffect, useState } from 'react'
import instance from '../../utils/instance';

function AllOrder() {
  const [books, setBooks] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await instance.get(`/getAllOrders`);
        setBooks(response.data.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching books:", error.response.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div>
      {books.map(()=>{
         
      })}
    </div>
  )
}

export default AllOrder
