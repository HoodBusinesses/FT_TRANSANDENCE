import React, { Component } from "react";
import Slider from "react-slick";

function CenterMode() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}

export default CenterMode;




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
        <Slider {...settings} className="p-10 ">
          <div
            className={` slide ${activeSlide === 0 ? "active h-96" : "inactive "}`}
          >
            <h3>
              {" "}
              <img src="1.jpg" className="w-full h-auto object-cover" />
            </h3>
          </div>
          <div className={`slide ${activeSlide === 1 ? "active  h-96 " : "inactive"}`}>
            <h3>
              {" "}
              <img src="table1.svg" className="w-full h-auto object-cover" />
            </h3>
          </div>
          <div className={`slide ${activeSlide === 2 ? "active  h-96" : "inactive"}`}>
            <h3>
              {" "}
              <img src="1.jpg" className="w-full h-auto object-cover" />
            </h3>
          </div>
          <div className={`slide ${activeSlide === 3 ? "active  h-96" : "inactive"}`}>
            <h3>
              {" "}
              <img src="3.jpg" className="w-full h-auto object-cover" />
            </h3>
          </div>
          <div className={`slide ${activeSlide === 4 ? "active  h-96" : "inactive"}`}>
            <h3>
              {" "}
              <img src="4.jpg" className="w-full h-auto object-cover" />
            </h3>
          </div>
        </Slider>
  
        {/* Add some CSS to scale the center image */}
        <style jsx>{`
          .slide {
            padding-top: 30px;
              background-color: brown;
          }
          .slide img {
            transition: transform 0.5s ease;
          }
          .active img {
            transform: scale(1.2); /* Bigger center image */
          }
          .inactive img {
            transform: scale(0.8); /* Smaller side images */
          }
        `}</style>
      </div>
    );
  }