import React, { useEffect, useState } from "react";
import instance from "../../utils/instance";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import CheckoutForm from "../../components/checkout/Checkout";
import { useNavigate } from "react-router-dom";
import imgs from '../../assets/cart.png'
function Cart() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const navigation=useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await instance.get(`/getCartBooks`);
        setBooks(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
        console.error("Error fetching books:", error.response.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (books && books.length > 0) {
      const total = books.reduce((sum, item) => sum + Number(item.price), 0);
      setTotal(total);
    } else {
      setTotal(0);
    }
  }, [books]);

  const handleDelete = async (id) => {
    try {
      const response = await instance.put(`/removeToCart/${id}`);
      toast.success("Book removed to Cart");
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      console.error("Error deleing books:", error);
    }
  };

  const placeOrder=async(e)=>{
    e.preventDefault()
    try{
      const response = await instance.post(`/orderNow`,{
        order:books
      });
      toast.success("Order is Placed");
      setBooks([]);
      navigation('/profile/orderHistory')
    }catch(error){
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Error placing order:", error);
    }finally{
      setLoading(false);
    }
  }
 
  return (
    <>
      <div className="bg-zinc-900 px-12   min-h-[80vh] py-8">
        
        {loading ? (
          <div className="flex  bg-zinc-900 h-screen justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            {books.length === 0 ? (
              <div className="h-screen">
                <div className="flex justify-center h-[100%] text-center flex-col">
                  <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                Empty Cart
                  </h1>
                  <img src={imgs} alt="/" className="lg:h-[50vh] object-contain " />
              </div>
              </div>
            ) : (
              <>
              <>
                {books.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-zinc-700 p-4 mb-4 min:h-full w-full rounded flex flex-col md:flex-row justify-between items-center"
                    >
                      <img
                        src={item.url}
                        alt="/"
                        className="h-[20vh] md:h-[10vh] object-cover"
                      />
                      <div className="w-full md:w-auto ">
                        <h1 className="text-zinc-100 text-2xl font-semibold items-start mt-2 md:mt-0">
                          {item.title}
                        </h1>
                        <p className="text-normal mt-2 text-zinc-300 hidden lg:block">
                          {item.description.slice(0, 100)}...
                        </p>
                        <p className="text-normal mt-2 text-zinc-300 hidden lg:hidden md:block">
                          {item.description.slice(0, 100)}...
                        </p>
                      </div>
                      <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                        <h1 className="text-zinc-100 text-3xl flex font-semibold">
                          Rs. {item.price}
                        </h1>
                      </div>
                      <button
                        className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                        onClick={() => handleDelete(item._id)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  );
                })}
              </>

              <div className="w-full mt-4 flex items-center justify-end ">
                
              <CheckoutForm total={total} allBooks={books} orderPlaced={placeOrder} loading={loading}/>
              </div>
              </>

            )}
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
