import React, { useState } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ data }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(
    location.pathname === "/profile" ? "/profile" : location.pathname
  );

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const linkClass = (path) =>
    `text-zinc-100 font-semibold w-full hover:bg-zinc-900 text-start py-2 rounded transition-all duration-300 ${
      activeLink === path ? "bg-zinc-700" : ""
    }`;

  return (
    <div className="py-1 rounded bg-zinc-800 flex px-3 flex-col mb-4 justify-around h-full lg:h-screen ">
      <div className="flex items-center flex-col">
        <img src={data.awatar} className="h-[12vh] rounded-full" alt="User Avatar" />
        <div className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </div>
        <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>
      <div className="w-[100%] items-center flex-col justify-center flex">
        <NavLink
          to="/profile"
          className={linkClass("/profile")}
          onClick={() => handleLinkClick("/profile")}
        >
          Favourites
        </NavLink>
        <NavLink
          to="/profile/orderHistory"
          className={linkClass("/profile/orderHistory")}
          onClick={() => handleLinkClick("/profile/orderHistory")}
        >
          History
        </NavLink>
        <NavLink
          to="/profile/setting"
          className={linkClass("/profile/setting")}
          onClick={() => handleLinkClick("/profile/setting")}
        >
          Setting
        </NavLink>
      </div>
      <div className="lg:w-full mt-4 lg:mt-0 text-white font-semibold hover:bg-zinc-900 py-2 flex items-center cursor-pointer">
        Logout <FaArrowRightFromBracket className="ms-4" />
      </div>
    </div>
  );
};

export default Sidebar;