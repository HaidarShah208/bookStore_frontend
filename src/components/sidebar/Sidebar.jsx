import React, { useState } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth/auth";
import Cookies from "js-cookie";
const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navgiation = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(
    location.pathname === "/profile" ? "/profile" : location.pathname
  );

  const role = useSelector((state) => state.auth.role);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const linkClass = (path) =>
    `text-zinc-100 font-semibold w-full hover:bg-zinc-900 text-start py-2 rounded transition-all duration-300 ${
      activeLink === path ? "bg-zinc-700" : ""
    }`;

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    navgiation("/");
  };

  return (
    <div className="md:py-8 py-3 rounded bg-zinc-800 flex px-3 flex-col mb-4 items-center justify-between h-full">
      <div className="flex items-center flex-col">
        <img
          src={data.awatar}
          className="h-[12vh] rounded-full"
          alt="User Avatar"
        />
        <div className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </div>
        <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>
      {role === "user" && (
        <div className="w-[100%] items-center flex-col justify-center hidden md:flex">
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
        <div className="w-[100%] items-center flex-col justify-center hidden md:flex">
          <NavLink
            to="/profile"
            className={linkClass("/profile")}
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
      <div
        onClick={handleLogout}
        className="lg:w-full md:mt-4  mt-8 bg-zinc-900 px-3 rounded lg:mt-0 text-white font-semibold hover:bg-zinc-900 py-2 flex items-center cursor-pointer"
      >
        Logout <FaArrowRightFromBracket className="ms-4" />
      </div>
    </div>
  );
};

export default Sidebar;
