import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import LoginModal from "./LoginModal";
import Drawer from "./_drawer";

const Footer = ({topDivRef}: any) => {

  const scrollToRef = () => {
    topDivRef.current!.scrollIntoView({behavior: "smooth"});
  };

  return (
    <div className="relative w-full py-8 h-64 mt-16 bg-gray-400 text-white flex flex-col justify-between items-center">
      <div></div>
      <div>Copyright ⓒ 2024</div>
      <div onClick={()=>scrollToRef()}
        className="absolute -top-4 bg-gray-500 w-12 h-12 text-center rounded-full shadow-lg">^</div>
    </div>
  );
};

export default Footer;