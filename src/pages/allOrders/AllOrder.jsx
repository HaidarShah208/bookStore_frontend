import React, { useEffect, useState } from "react";
import instance from "../../utils/instance";
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { IoCheckmark, IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

function AllOrder() {
  const [books, setBooks] = useState("");
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await instance.get(`/getAllOrders`);
        setBooks(response.data.data);
        console.log("orders", response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error.response.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    try {
      let id = books[i]._id;
      console.log(id);
      const response = await instance.put(`/updateOrders/${id}`, {
        status: Values.status,
      });
      const updatedBooks = [...books];
      updatedBooks[i].status = Values.status;
      setBooks(updatedBooks);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating order:", error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      {loading ? (
        <div className="flex my-20 h-screen justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {books.length === 0 ? (
            <div className="h-screen">
              <div className="flex justify-center h-[100%] text-center flex-col">
                <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                  No Ordered Here
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
              {books && books.length > 0 && (
                <div className="p-0 md:p-4 h-[100%] text-zinc-100">
                  <div className="text-3xl md:5xl font-semibold text-white mb-8">
                    Your order history
                  </div>
                  <div className="w-full rounded mt-4 py-2 px-4 flex gap-2 font-semibold text-white border border-e">
                    <div className="w-[5%]">
                      <h1 className="text-center text-sm md:text-base">Sr.</h1>
                    </div>
                    <div className="w-[30%] md:w-[22%]">
                      <h1 className="text-sm md:text-base">Books</h1>
                    </div>
                    <div className="w-0 md:w-[45%] hidden md:block">
                      <h1 className="text-sm md:text-base">Description.</h1>
                    </div>
                    <div className="md:w-[9%] w-[17%]">
                      <h1 className="text-sm md:text-base">Price</h1>
                    </div>
                    <div className="md:w-[16%] w-[30%]">
                      <h1 className="text-sm md:text-base">Status</h1>
                    </div>
                    <div className="w-[10%] md:w-[5%]">
                      <h1 className="text-sm md:text-base">
                        <FaUserLarge />{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
              {books.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="w-full  hover:bg-text-white  mt-4 py-3 my-1 px-4 flex gap-3 text-zinc-300 hover:text-white hover:bg-zinc-700 border-b-2 border-gray-500  hover:cursor-pointer"
                  >
                    <div className="w-[5%]">
                      <h1 className="text-center">{i + 1}</h1>
                    </div>
                    <div className="md:w-[22%] w-[30%]">
                      <Link
                        to={`/getBook/${item.book._id}`}
                        className="hover:text-blue-700 text-sm md:text-base"
                      >
                        {item.book.title}
                      </Link>
                    </div>
                    <div className="w-[45%]">
                      <h1 className="text-sm md:text-base">
                        {item.book.description.slice(0, 15)}...
                      </h1>
                    </div>
                    <div className="w-[9%]">
                      <h1 className="text-sm md:text-base">
                        Rs. {item.book.price}
                      </h1>
                    </div>
                    <div className="md:w-[16%] w-[30%]">
                      <button
                        onClick={() => setOptions(i)}
                        className="hover:scale-105 transition-all duration-300  text-sm md:text-base"
                      >
                        {item.status === "place order" ? (
                          <div className="text-green-500">{item.status}</div>
                        ) : item.status === "cancelled" ? (
                          <div className="text-red-600">{item.status}</div>
                        ) : (
                          <div className="text-sky-600">{item.status}</div>
                        )}
                      </button>
                      <div
                        className={`${
                          options === i ? "block" : "hidden"
                        } flex flex-row pt-2 items-center`}
                      >
                        <select
                          name="status"
                          id=""
                          value={Values.status}
                          className="bg-gray-800 rounded py-1"
                          onChange={change}
                        >
                          {[
                            "place order",
                            "cancelled",
                            "delivered",
                            "Out for delivery",
                          ].map((items, i) => {
                            return (
                              <option key={i} value={items}>
                                {items}
                              </option>
                            );
                          })}
                        </select>
                        <button
                          onClick={() => {
                            setOptions(-1);
                            submitChanges(i);
                          }}
                          className="hover:text-red-700 ml-1"
                        >
                          <IoCheckmark />
                        </button>
                      </div>
                    </div>
                    <div
                      onClick={() => openModal(item.user)}
                      className="w-none md:w-[5%] hidden md:block text-sm md:text-base"
                    >
                      <BsBoxArrowUpRight />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Info</h2>
              <button onClick={closeModal}>
                <IoCloseSharp className="text-2xl" />
              </button>
            </div>
            {selectedUser ? (
              <div>
                <p className="text-white">
                  <strong>Name:</strong> {selectedUser.username}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Address:</strong> {selectedUser.address}
                </p>
              </div>
            ) : (
              <p>No user info available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllOrder;
