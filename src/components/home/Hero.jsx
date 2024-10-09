import React from "react";
import homeImg from '../../assets/home.png'
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:mb-0 mb-12 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-center lg:text-start text-yellow-60">
          Discover your Next Great Read
        </h1>
        <p className="text-xl mt-4 text-zinc-300">
          Uncover captive stories, enrinching knowledge, and endless inspiration
          in our curated collection of books
        </p>
        <Link to={'/allBooks'}>
        <div  className="mt-8 text-2xl  text-zinc-300 border border-yellow-100 px-10 py-2 rounded-full hover:bg-zinc-800">
          Discover Books
        </div>
        </Link>
      </div>
      <div className="w-full lg:w-3/6 flex items-center justify-center h-auto lg:h-[100%]">
      <img src={homeImg} alt="img" />
      </div>
    </div>
  );
}

export default Hero;
