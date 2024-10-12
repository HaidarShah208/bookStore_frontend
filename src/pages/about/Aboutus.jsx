import React from "react";
import BooksImg from "../../assets/books.png";
import FAQAccordion from "../../components/swiper/Swiper";

function Aboutus() {
  return (
    <>
    <div className="bg-zinc-900 p-4 flex md:flex-row flex-col">
      <div className="w-full md:w-1/2 text-zinc-300 text-justify">
        <span className="text-white text-start font-semibold text-xl block py-5">
          {" "}
          MISSION
        </span>
        Glaxicy Books is a family-owned chain of nationwide bookstores. Our
        journey began in 1952 with a kiosk in Karachi’s old city. Today we stand
        with a national network of artisanal bookstores and a personalized
        online experience serving pan Pakistan. With over 90,000 original
        titles, bargain books, gifts, and educational resource materials, we
        offer our diverse readership a welcoming environment for their
        intellectual endeavours through book launches, book bazaars, children’s
        story sessions and more. Committed to engaging with diverse readers of
        all ages, and organizations on a national scale, we strive to encourage
        knowledge enhancement and educational attainment for all. Passionate
        about the written word, we aim to serve all those who seek the treasure
        beyond measure books hold, and endeavor to help create and sustain a
        nation of lifelong readers.
      </div>
      <div className="w-full md:w-1/2 ps-1 md:ps-5 lg:ps-24">
        <img
          src={BooksImg}
          alt="book"
          className="flex items-center justify-center h-auto lg:h-[100%]"
        />
      </div>
    </div>
    <FAQAccordion/>
    </>

  );
}

export default Aboutus;
