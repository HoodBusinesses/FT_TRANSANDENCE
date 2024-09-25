import React from "react";
import "./../globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import Slider from "react-slick";


import { useRef, memo } from 'react';
import { StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel';

const data = [
	{ cover: './table1.svg', title: 'Dunkirk' },
	{ cover: './table1.svg', title: 'Dunkirk' },
	{ cover: './table1.svg', title: 'Dunkirk' },
	{ cover: './table1.svg', title: 'Dunkirk' },
	{ cover: './table1.svg', title: 'Dunkirk' }
  ];

function ResponsiveCarousel() {
  const ref = useRef({});
  
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* ResponsiveContainer will have the same width as its parent element */}
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          let currentVisibleSlide = 5;
          if (parentWidth <= 1440) currentVisibleSlide = 3;
          else if (parentWidth <= 1080) currentVisibleSlide = 1;

          return (
            <StackedCarousel
              ref={carouselRef}
              data={data}
              carouselWidth={parentWidth}
              slideWidth={500}
              slideComponent={Card}
              maxVisibleSlide={5}
              currentVisibleSlide={currentVisibleSlide}
              useGrabCursor={true}
            />
          );
        }}
      />
    </div>
  );
}

// Very important to memoize your component!!!
const Card = memo(
	function (props) {
	  const { data, dataIndex } = props;
	  const { cover } = data[dataIndex];
  
	  return (
		<div style={{ width: '100%', height: 300 }}>
		  <img
			style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: 10 }}
			draggable={false}
			src={cover}
			alt="carousel-slide"
		  />
		</div>
	  );
	},
	function (prevProps, nextProps) {
	  return prevProps.dataIndex === nextProps.dataIndex;
	}
  );
  

export function Maps() {
  return (
    <div
      className="min-h-[calc(100vh-104px)] "
      style={{
        backgroundColor: "#222831",
        fontFamily: "Kaisei Decol",
        color: "#FFD369",
      }}
    >
      <div className="a">
        <div>
          <h1 className="text-2xl flex justify-center font-extralight pt-20 pb-10 tracking-widest">
            Maps
          </h1>
        </div>
        <div className="mb-32">
          <ResponsiveCarousel />
        </div>
        <div>
          <h1 className="text-2xl flex justify-center font-extralight pb-10 pt-10tracking-widest">
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
          <button onClick={() => (window.location.href = "#")} className="bg-[#393E46] p-5 m-24 rounded-[30px] w-48 border-2 ">
            <span className="text-2xl tracking-widest ">Play</span>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
