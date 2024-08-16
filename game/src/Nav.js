import React, { useState } from "react";
import "./App";
import { IoHomeOutline } from "react-icons/io5";
import { GiThreeFriends } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { IoMenu } from "react-icons/io5";


export function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="bg min-h-screen min-w-screen">
      <nav className="navbar w-full flex justify-end lg:flex lg:justify-end items-center flex-wrap">
        <div className="logo">
          <a href="#" className="flex items-center">
            <div className="text-[60.97px] justify-end">
              <h1>P</h1>
            </div>
            <div className="inline-block justify-end items-end tracking-wide">
              <div className="text-[22.63px] mb-0">ING</div>
              <div className="text-[22.63px] -mt-2.5">ONG</div>
            </div>
          </a>
        </div>
       
        <button
          className="nav-toggler p-5 inline-flex lg:hidden ml-auto"
          onClick={handleToggle}
        >
         <IoMenu className="text-4xl "/>
        </button>
        
        <div
          className={`containerNav w-full lg:ml-auto lg:w-auto lg:flex lg:justify-end ${
            isNavOpen ? "block" : "hidden"
          }`}
          id="respNav"
        >
          <div className="icons w-full flex items-end lg:space-x-4 space-y-4 lg:space-y-0 flex-col lg:flex-row lg:float-right gap-2 ">
           
            <a href="#" className=" flex px-5">
              <IoHomeOutline className="text-xl mr-3"/>
              <span className="">Home</span>
            </a>
            <a href="#" className="flex px-5">
              <FaRegLightbulb className="text-xl mr-3"/>
              <span className="">About</span>
            </a>
            <a href="#" className="flex px-5">
              <GiThreeFriends className="text-xl mr-3"/>
              <span className="">Friends</span>
            </a>
            <a href="#" className="flex px-5">
              <MdLeaderboard className="text-xl mr-3"/>
              <span className="">Leaderboard</span>
            </a>
            
            <a href="#" className="flex px-5">
			        <MdNotificationsActive className="text-xl mr-3"/>
              {/* <span className="">Notif</span> */}
            </a>
            <a href="#" className=" flex px-5">
              <FaRegCircleUser className="text-xl mr-3"/>
              <span className="">User</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}




