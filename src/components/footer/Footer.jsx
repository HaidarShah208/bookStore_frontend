import React from "react";
import { Link } from "react-router-dom";
import bookIcon from "../../assets/bookIcon.png";

export default function App() {
  const date = new Date();
  const ss = date.getFullYear();
  return (
    <footer className="bg-zinc-800 text-center text-gray-600">
      <section className="flex justify-center lg:justify-between p-4 border-b border-gray-300">
        <div className="me-5 hidden lg:block">
          <img src={bookIcon} alt="book" className="w-10 ms-5 " />
          <p className="ps-3">Know more about us</p>
        </div>
      </section>

      <section className="">
        <div className="container mx-auto text-center md:text-left my-8">
          <div className="flex flex-wrap justify-center md:justify-between">
            <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 mb-8 md:mb-0 text-center md:text-left">
              <h6 className="uppercase font-bold mb-4 flex items-center justify-center text-white md:justify-start">
                <i className="fas fa-gem mr-3"></i>
                Glaxicy Books
              </h6>
              <p className="text-white text-justify">
                Glaxicy Books is a prestigious, family-owned chain of bookstores
                with a nationwide presence. Established in 1952 with a humble
                kiosk in the historic heart of Karachi, we have since evolved
                into a sophisticated network of artisanal bookstores,
                complemented by a bespoke online platform that caters to readers
                across Pakistan.
              </p>
            </div>

            <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 mb-8 md:mb-0 text-center">
              <h6 className="uppercase font-bold mb-4 text-white">Pages</h6>
              <p className="mb-4">
                <Link to={"/"} className="text-white">
                  Home
                </Link>
              </p>
              <p className="mb-4">
                <Link to={"/about"} className="text-white">
                  About us
                </Link>
              </p>
              <p className="mb-4">
                <Link to={"allBooks"} className="text-white">
                  All Books
                </Link>
              </p>
              <p className="mb-4">
                <Link to="/profile" className="text-white">
                  Your Profile
                </Link>
              </p>
            </div>

            <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 mb-8 md:mb-0 text-center">
              <h6 className="uppercase font-bold mb-4 text-white">Contact</h6>
              <p className="mb-4 text-white">
                <i className="fas fa-home mr-2"></i> Punjab, Pakistan
              </p>
              <p className="mb-4 text-white">
                <i className="fas fa-envelope mr-2"></i> alhi7896542@gmail.com
              </p>
              <p className="mb-4 text-white">
                <i className="fas fa-phone mr-2"></i> +92 3107580073
              </p>
              <p className="mb-4 text-white">
                <i className="fas fa-print mr-2"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center text-white p-4 bg-zinc-900">
        © {ss} Copyright
      </div>
    </footer>
  );
}
