import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import instance from "../../utils/instance";

function Profile() {

  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await instance.get("/see");
        setProfile(response.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

 

  return (
    <div className="bg-zinc-900 px-4  flex flex-col md:flex-row min:h-full h-screen py-8 gap-2 text-white">
      {!loading ? (
        <>
          <div className="w-full md:w-1/6">
            <Sidebar data={profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
}

export default Profile;
