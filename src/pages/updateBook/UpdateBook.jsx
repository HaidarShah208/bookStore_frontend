import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../utils/instance";

function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [bookData, setBookData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    language: "",
    description: "",
  });

  // Fetch book data when the component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await instance.get(`/getBook/${id}`);
        console.log(response)
        setBookData({
          url: response.data.book.url,
          title: response.data.book.title,
          author: response.data.book.author,
          price: response.data.book.price,
          language: response.data.book.language,
          description: response.data.book.description, // Ensure the field matches your data structure
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching book details");
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { url, title, author, price, language, description } = bookData;
    if (!url || !title || !description || !author || !price || !language) {
      return toast.error("Please fill all fields");
    }
    try {
      setLoading(true);
      const response = await instance.put(`/updateBook/${id}`, {
        url,
        title,
        author,
        price,
        language,
        description,
      });
      toast.success("Book Updated");
      console.log(response)
      navigate("/allBooks"); // Redirect after successful update
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data || "Something went wrong");
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="bg-zinc-900 ">
      <div className="min-h-screen flex w-full px-5 py-5 items-center justify-center">
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg  w-full">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Update Book
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-white font-semibold">
                Image URL
              </label>
              <input
                type="text"
                name="url"
                value={bookData.url}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 bg-zinc-600 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className="w-full px-4 py-2 mt-2 bg-zinc-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
              />
            </div>

            <div className="flex md:flex-row justify-between flex-col">
              <div className="w-full md:me-4">
                <label className="block text-white font-semibold">Author</label>
                <input
                  type="text"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className="w-full px-4 py-2 mt-2 border bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
                />
              </div>
              <div className="w-full">
                <label className="block text-white font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={bookData.price}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className="w-full px-4 py-2 mt-2 border bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold">Language</label>
              <input
                type="text"
                name="language"
                value={bookData.language}
                onChange={handleChange}
                placeholder="Enter language"
                className="w-full px-4 py-2 mt-2 border bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold">
                Description
              </label>
              <textarea
                name="description"
                value={bookData.description}
                onChange={handleChange}
                placeholder="Enter book description"
                className="w-full px-4 py-2 mt-2 border bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600"
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-zinc-600 text-white px-6 py-2 rounded-md hover:bg-zinc-500 transition-colors"
              >
                {loading ? "Updating..." : "Update Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBook;
