import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../../components/bookCard/BookCard'

function RecentlyAddedBooks() {
  const [books,setBooks]=useState('')
  const [loading, setLoading] = useState(true);  


  useEffect(()=>{
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://book-store-backend-gamma-neon.vercel.app/api/v1/recentBooks');
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }  finally {
        setLoading(false);
        }};
    fetchBooks();
  },[])


  return (
    <div className='mt-8'>
      <h4 className='text-3xl text-yellow-100'>
        Recently Added Books
        </h4>  
        {loading ? (
          <div className="flex my-20 justify-center items-center">
            <span className="loader"></span>
          </div>
            ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 mt-10 ">
          {books && books.map((items,i)=>{
            return(
              <div key={i}>
                <BookCard data={items} />
              </div>
            )
          }) }
          </div>    
            )}
    </div>
  )
}

export default RecentlyAddedBooks
