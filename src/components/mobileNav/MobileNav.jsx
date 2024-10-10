import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function MobileNav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(
    location.pathname === "/profile" ? "/profile" : location.pathname
  );
  const role = useSelector((state) => state.auth.role);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const linkClass = (path) =>
    `text-zinc-100 font-semibold md:hidden w-[100%] ms-7  flex justify-between hover:bg-zinc-900 text-start py-2 rounded transition-all duration-300 ${
      activeLink === path ? "bg-zinc-700" : ""
    }`;
  return (
    <>
      {role === "user" && (
        <div className="w-[100%] flex items-center text-center justify-between ">
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
      )}
       {role === "admin" && (
        <div className="w-[100%] flex items-center  justify-center  md:hidden">
          <NavLink
            to="/profile"
            className={linkClass("/profile") }
            onClick={() => handleLinkClick("/profile")}
          >
            All Orders
          </NavLink>
          <NavLink
            to="/profile/addBook"
            className={linkClass("/profile/setting")}
            onClick={() => handleLinkClick("/profile/setting")}
          >
            Add Book
          </NavLink>
        </div>
      )}
    </>
  );
}

export default MobileNav;
