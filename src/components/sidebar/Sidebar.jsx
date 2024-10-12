import React, { useRef, useState } from "react";
import { FaArrowRightFromBracket, FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth/auth";
import Cookies from "js-cookie";
import instance from "../../utils/instance";


const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navgiation = useNavigate();
  const location = useLocation();
  const [isUploading, setIsUploading] = useState(false);
  const avatar = useSelector((state) => state.auth.avatar || data.avatar);
  const [activeLink, setActiveLink] = useState(
    location.pathname === "/profile" ? "/profile" : location.pathname
  );

  const role = useSelector((state) => state.auth.role);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  const fileInputRef = useRef(null);

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


  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('file', file);
      setIsUploading(true);
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await instance.post('/uploadAvatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const avatarUrl = response.data.avatarUrl;
        dispatch(authActions.updateAvatar(avatarUrl));
        Cookies.set('avatar', avatarUrl);
      } catch (error) {
        console.error('Error uploading avatar:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="md:py-8 py-3 rounded bg-zinc-800 flex px-3 flex-col mb-4 items-center justify-between h-full">
      <div className="flex items-center flex-col">
      <div className="relative">
          <img
            src={avatar}
            className="h-[14vh] w-[14vh] rounded-full object-cover cursor-pointer"
            alt="User Avatar"
            onClick={handleAvatarClick}
          />
          <div className="absolute bottom-0 -right-2 bg-zinc-700 rounded-full p-2 cursor-pointer" onClick={handleAvatarClick}>
            <FaCamera className="text-white text-xs" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        {isUploading && <p className="text-zinc-300 mt-2">Uploading...</p>}
        <div className="mt-3 lg:text-xl text-xs text-zinc-100 font-semibold">
          {data.username}
        </div>
        <div className="mt-1 lg:text-base text-xs text-zinc-300">{data.email}</div>
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
