import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import Notif from './Notification'
import User from './User'
import Language from './Language'
import { Button, Drawer, Space } from 'antd';





const navItems = [
  { title: "Leaderboard", icon: "./leaderboard.svg", isVisible: true },
  { title: "Friends", icon: "./friend.svg", isVisible: true },
  { title: "About", icon: "./about.svg", isVisible: true },
  { title: "Home", icon: "./Home.svg", isVisible: true },
];

const NavBarItems = ({ item, index}) => {
	const { icon, title, isVisible } = item;

  if (!isVisible) {
    return null;
  }

  return (
    <a
      className="flex lg:flex-col items-center  px-5 text-end "
    >
      <img src={icon} alt={title} className="w-5 h-5 lg:w-7 mr-2 lg:mr-0 lg:h-6 " />
      {/* w-16 */}
      <div className="text-start">
        <span>{title}</span>
      </div>
    </a>
  );
};

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [placement] = useState('left');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space className="flex h-24 items-center gap-5 absolute left-5 ">
        <Button  className="lg:hidden border-none" onClick={showDrawer} style={{color:'#FFD369', backgroundColor:"#222831"}}>
          <IoMenu className="text-4xl" />
        </Button>
      </Space>
      <Drawer
        title={<img src="./logo.svg" />}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
        width={250}
        style={{backgroundColor:"#393E46",  fontFamily:'Kaisei Decol', color:'#FFD369'}} 
      >
       <div className="icons flex flex-col-reverse gap-10 absolute top-10 ">
            {navItems.map((item, index) => (
              <NavBarItems key={index} item={item}/>
            ))}
            <Notif isSmall={false} />
            <Language isSmall={false} />
            <User isSmall={false} />
          </div>
      </Drawer>
    </>
  );
};



export function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
    };

  return (
    <div className="bg min-h-auto min-w-full" style={{backgroundColor:"#222831", fontFamily:'Kaisei Decol', color:'#FFD369'}}>
      <nav className="navbar flex flex-wrap p-2"> {/*remove the flexwrap*/}
        {/* The logo here */}
        <div className="logo relative left-1/4 lg:ml-10 lg:left-0">
          <a href="#">
            <img src="./logo.svg" />
          </a>
        </div>
        {/* the responsive bar */}
        <div className="flex h-24 items-center gap-5 absolute left-5">
        </div>
        <div className="flex ml-auto items-center gap-5">
          <Language isSmall={true} />
          <Notif isSmall={true} />
          <User isSmall={true}/> 

        </div>
        
        {/* navComponents */}
        
        <SideBar />
        <div
          className={`w-full lg:ml-auto lg:w-auto lg:flex lg:justify-end
          }`}
        >
          <div className="icons w-40 lg:flex hidden lg:w-full lg:items-center lg:flex-row gap-5">
            {navItems.map((item, index) => (
              <NavBarItems key={index} item={item}/>
            ))}
            <Notif isSmall={false} />
            <Language isSmall={false} />
            <User isSmall={false} />
          </div>
        </div>
      </nav>
    </div>
  );
}

