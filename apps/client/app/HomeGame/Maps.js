import React from "react";
import "./../globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Slider from "react-slick";

function CenterMode() {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "1px",
    slidesToShow: 3,
    speed: 500,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div
          className={` slide ${activeSlide === 0 ? "active h-96" : "inactive "}`}
        >
          <h3>
            {" "}
            <img src="table1.svg" className="h-auto" />
          </h3>
        </div>
        <div
          className={`slide ${activeSlide === 1 ? "active h-96 " : "inactive"}`}
        >
          <h3>
            {" "}
            <img src="table1.svg" className="h-auto" />
          </h3>
        </div>
        <div
          className={`slide ${activeSlide === 2 ? "active h-96" : "inactive"}`}
        >
          <h3>
            {" "}
            <img src="table1.svg" className="h-auto" />
          </h3>
        </div>
        <div
          className={`slide ${activeSlide === 3 ? "active h-96" : "inactive"}`}
        >
          <h3>
            {" "}
            <img src="table1.svg" className="h-auto" />
          </h3>
        </div>
        <div
          className={`slide ${activeSlide === 4 ? "active h-96" : "inactive"}`}
        >
          <h3>
            {" "}
            <img src="table1.svg" className="h-auto" />
          </h3>
        </div>
      </Slider>
    </div>
  );
}

export default CenterMode;

export function Maps() {
  return (
    <div
      className="min-h-[calc(100vh-103px)] min-w-full"
      style={{
        backgroundColor: "#222831",
        fontFamily: "Kaisei Decol",
        color: "#FFD369",
      }}
    >
      <div className="">
        <div>
          <h1 className="text-2xl flex justify-center font-extralight pt-20 pb-5 tracking-widest">
            Maps
          </h1>
        </div>
        <div className="">
          <CenterMode />
        </div>
        <div>
          <h1 className="text-2xl flex justify-center font-extralight pb-5 tracking-widest">
            Mode
          </h1>
        </div>
        <div className="flex justify-center gap-10 mb-16">
          <div>
            <button
              className="bg-[#393E46] p-7 rounded-lg w-48 relative"
              onClick={() => (window.location.href = "#")}
            >
              <div className="w-4 h-4 bg-[#222831] rounded-full absolute top-2 right-2 " />
              <span className="text-2xl tracking-widest"> Classic </span>
            </button>
          </div>
          <div>
            <button
              className=" bg-[#393E46] p-7 rounded-lg w-48 relative"
              onClick={() => (window.location.href = "#")}
            >
              <div className="w-4 h-4 bg-[#222831] rounded-full absolute top-2 right-2  " />
              <span className="text-2xl tracking-widest"> Tournament </span>
            </button>
          </div>
        </div>
        <div className="flex justify-center pb-20">
          <button onClick={() => (window.location.href = "#")} className="bg-[#393E46] p-5 rounded-[30px] w-[20%] border-2 ">
            {" "}
            <span className="text-2xl tracking-widest ">Play</span>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
