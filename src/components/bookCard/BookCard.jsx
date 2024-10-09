import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../utils/instance";
import toast from "react-hot-toast";

function BookCard({ data, favourite, onRemove }) {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/removefavourteBook/${data._id}`);
      console.log(response);
      toast.success(response.data.message);
      onRemove(data._id);
    } catch (error) {
      toast.error(error.data.message);
      console.error("Error fetching books:", error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col md:mx-3 md:my-0 my-3">
      <Link to={`/getBook/${data._id}`}>
        <div className="items-center bg-zinc-900 rounded flex justify-center">
          <img src={data.url} alt="/" className="h-[25vh]" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
        <p className="mt-2 text-zinc-400 font-semibold">{data.author}</p>
        <p className="mt-2 text-xl text-zinc-200 font-semibold">
          {" "}
          Rs.{data.price}
        </p>
      </Link>
      {favourite && (
        <button
          onClick={handleRemove}
          className="text-md text-white bg-slate-950 rounded mt-4 py-2"
        >
          {" "}
          {loading ? "Removing..." : "Remove"}
        </button>
      )}
    </div>
  );
}

export default BookCard;
