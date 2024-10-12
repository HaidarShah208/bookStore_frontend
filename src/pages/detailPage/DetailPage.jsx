import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa6";
import { FaEdit, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import instance from "../../utils/instance";
import { Link, useNavigate, useParams } from "react-router-dom";

function DetailPage() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [books, setBooks] = useState("");
  const [loading, setLoading] = useState(true);
const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
const role=useSelector((state)=>state.auth.role)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://book-store-backend-gamma-neon.vercel.app/api/v1/getBook/${id}`
        );
        console.log(response.data.book)
        setBooks(response.data.book);
      } catch (error) {
        console.error("Error fetching books:", error.response.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  
  const handleFavourite=async()=>{
    try{
    const response = await instance.put(`/favourteBook/${id}`);
     toast.success('Book added to favorites')
    }catch(error){
      toast.error(error.response?.data?.error || "Something went wrong");
      console.error("Error fetching books:", error);
    }
  }


  const handleCart=async()=>{
    try{
    const response = await instance.put(`/addToCart/${id}`);
    toast.success('Book added to Cart')

    }catch(error){
      toast.error(error.response?.data?.error || "Something went wrong");
      console.error("Error fetching books:", error);
    }
  }


  const DeleteBook=async()=>{
    try{
    const response = await instance.delete(`/deleteBook/${id}`);
    console.log(response);
    toast.success('Book Removed')
    navigation('/allbooks')
    }catch(error){
      toast.error(error.response?.data?.error || "Something went wrong");
      console.error("Error fetching books:", error);
    }
  }



  return (
    <>
      {loading ? (
        <div className="flex min-h-screen h-auto bg-zinc-900 justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex md:flex-row flex-col gap-8">
          <div className="bg-zinc-800 rounded p-4 h-auto w-full lg:w-3/6 flex justify-center gap-5 lg:gap-10">
            <img
              src={books.url}
              alt="/"
              className="h-auto lg:h-[70vh] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            {isLoggedIn && role=== 'user' && 
            <div className="flex flex-col ">
              <div className="bg-white text-2xl  cursor-pointer rounded-full p-2" onClick={handleFavourite}><FaHeart/> </div>
              <div className="bg-white text-2xl rounded-full cursor-pointer p-2 mt-4" onClick={handleCart}><FaShoppingCart/> </div>
            </div>
            }
            {isLoggedIn && role=== 'admin' && 
            <div className="flex flex-col ">
              <Link to={`/updateBook/${id}`}>
              <div className="bg-white text-2xl  cursor-pointer rounded-full p-2"><FaEdit/> </div>
              </Link>
              <div className="bg-white text-2xl rounded-full cursor-pointer p-2 mt-4" onClick={DeleteBook}><MdOutlineDelete/> </div>
            </div>
            }
          </div>
          <div className="w-full lg:w-3/6">
            <div className="text-4xl text-zinc-300 font-semibold">
              {books.title}
            </div>
            <div className="mt-1 text-zinc-400  ">by {books.author}</div>
            <div className="mt-4 text-zinc-500 text-xl text-justify "> {books.description}</div>
            <div className="flex items-center justify-start text-zinc-400 text-xl mt-6">
              <GrLanguage className="me-2 pt-0.5" /> {books.language}
            </div>
            <div className="mt-4 font-semibold text-zinc-100 text-3xl ">
              Price: Rs. {books.price}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailPage;
