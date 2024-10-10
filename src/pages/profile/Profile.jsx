import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import instance from "../../utils/instance";
import MobileNav from "../../components/mobileNav/MobileNav";

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
    <div className="bg-zinc-900 px-4  flex flex-col md:flex-row h-full  py-8 gap-2 text-white">
      {!loading ? (
        <>
          <div className="w-full md:w-1/6 ">
            <Sidebar data={profile} />
            <MobileNav/>
          </div>
          <div className="w-full md:w-5/6 min-h-screen h-auto">
            <Outlet />
          </div>
        </>
      ) : (
        <div className="flex w-full h-screen justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
}

export default Profile;
