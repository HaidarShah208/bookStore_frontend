import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa6";
import { useSelector } from "react-redux";
import bookIcon from '../../assets/bookIcon.png'
const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About us",
      link: "/about",
    },
    {
      title: "All Books",
      link: "/allBooks",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role=useSelector((state) => state.auth.role)
  if (!isLoggedIn) {
    {
      links.splice(3, 3);
    }
  }

  if(isLoggedIn && role === 'user') {
    {
      links.splice(5, 1);
    }
  }
  if(isLoggedIn && role === 'admin') {
    {
      links.splice(3, 2);
    }
  }
  return (
    <>
      <nav className="z-50 flex relative  bg-zinc-800 text-white px-8 py-4 justify-between items-center">
        <div className="flex flex-row">
          <img src={bookIcon} alt="book"  className="w-10 "/>
          <Link to={"/"}>
            <h1 className="text-2xl text-center ps-3 font-semibold">Book Glaxciy</h1>
          </Link>
        </div>
        <div className="nav-links-heaven block md:flex gap-4 items-center">
          <div className="hidden md:flex gap-4">
            {links.map((link, index) => (
              <div key={index}>
                {link.title === "Profile" || link.title === "Admin Profile" ? (
                  <Link
                    to={link.link}
                    key={index}
                    className="hover:text-zinc-800 transition-all hover:bg-blue-500 border px-2 py-1 border-blue-500 rounded duration-300 cursor-pointer"
                  >
                    {link.title}
                  </Link>
                ) : (
                  <Link
                    to={link.link}
                    key={index}
                    className="hover:text-blue-500 flex justify-center items-center transition-all duration-300 cursor-pointer"
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to={"/login"}
                className="hover:text-zinc-800 transition-all hover:bg-blue-500 border px-2 py-1 border-blue-500 rounded duration-300 cursor-pointer"
              >
                Log in
              </Link>
            </div>
          )}
          <button
            className="text-2xl hover:text-zinc-400 md:hidden block"
            onClick={toggleMenu}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="absolute bg-zinc-800 top-0 left-0 h-screen z-40 w-full flex flex-col items-center justify-center">
          {links.map((link, index) => (
              <>
              {link.title === "Profile" ? (
                <Link
                  to={link.link}
                  key={index}
                  onClick={() => setIsMenuOpen(false)}
                  className="transition-all text-3xl text-white hover:text-blue-500 font-semibold mb-5 duration-300 cursor-pointer"
                >
                  {link.title}
                </Link>
              ) : (
            <Link
              onClick={() => setIsMenuOpen(false)}
              to={link.link}
              key={index}
              className=" transition-all text-3xl text-white hover:text-blue-500 font-semibold mb-5 duration-300 cursor-pointer"
            >
              {link.title}
            </Link>
              )}
              </>
          ))}
          {!isLoggedIn && (
            <Link to={"/login"}>
              <button
                onClick={() => setIsMenuOpen(false)}
                className=" text-2xl hover:text-white mb-3 font-semibold transition-all hover:bg-blue-500 border px-2 py-1 border-blue-500 rounded duration-300 cursor-pointer"
              >
                Log in
              </button>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
