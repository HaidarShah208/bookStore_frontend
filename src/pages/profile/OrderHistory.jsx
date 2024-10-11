import React, { useEffect, useState } from "react";
import instance from "../../utils/instance";
import save from "../../assets/save.png";
import { Link } from "react-router-dom";

function OrderHistory() {
  const [order, setorder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await instance.get(`/getOrders`);
        setorder(response.data.data);
        console.log("orders", response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error.response.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div className="min-h-screen h-auto">
      {loading ? (
        <div className="flex my-20 h-screen justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {order.length === 0 ? (
            <div className="h-screen">
              <div className="flex justify-center h-[100%] text-center flex-col">
                <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                  No Order Yet
                </h1>
                <img
                  src={save}
                  alt="/"
                  className="lg:h-[50vh] object-contain "
                />
              </div>
            </div>
          ) : (
            <>
              {order && order.length > 0 && (
                <div className="p-0 md:p-4 h-[100%] text-zinc-100">
                  <div className="text-3xl md:5xl font-semibold text-white mb-8">
                    Your order history
                  </div>
                  <div className="w-full rounded mt-4 py-2 px-4 flex gap-3 font-semibold text-white border border-e">
                    <div className="w-[3%]">
                      <h1 className="text-center text-sm md:text-base">Sr.</h1>
                    </div>
                    <div className="w-[22%]">
                      <h1 className="text-sm md:text-base">Books</h1>
                    </div>
                    <div className="w-[45%]">
                      <h1 className="text-sm md:text-base">Description.</h1>
                    </div>
                    <div className="w-[9%]">
                      <h1 className="text-sm md:text-base">Price</h1>
                    </div>
                    <div className="w-[16%]">
                      <h1 className="text-sm md:text-base">Status</h1>
                    </div>
                    <div className="w-none md:w-[5%] hidden md:block">
                      <h1 className="text-sm md:text-base">Mode</h1>
                    </div>
                  </div>
                </div>
              )}
              {order.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="w-full rounded hover:bg-text-white  mt-4 py-3 my-1 px-4 flex gap-3 text-zinc-300 hover:text-white hover:bg-zinc-700  hover:cursor-pointer"
                  >
                    <div className="w-[3%]">
                      <h1 className="text-center">{i + 1}</h1>
                    </div>
                    <div className="w-[22%]">
                      <Link to={`/getBook/${item.book._id}`} className="hover:text-blue-700 text-sm md:text-base">{item.book.title}</Link>
                    </div>
                    <div className="w-[45%]">
                      <h1 className="text-sm md:text-base">{item.book.description.slice(0,15)}...</h1>
                    </div>
                    <div className="w-[9%]">
                      <h1 className="text-sm md:text-base">Rs. {item.book.price}</h1>
                    </div>
                    <div className="w-[16%]">
                      <h1 className="text-sm md:text-base">
                        {item.status === 'place order'?
                          (
                         <div className="text-green-500">{item.status}</div>)
                        :item.status === 'cancelled'?
                        <div className="text-red-600">{item.status}</div>
                        : <div className="text-sky-700">{item.status}</div>
                        }
                        
                      </h1>
                    </div>
                    <div className="w-none md:w-[5%] hidden md:block text-sm md:text-base">
                      <h1 className="">COD</h1>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default OrderHistory;
