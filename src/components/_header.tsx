import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import LoginModal from "./LoginModal";
import Drawer from "./_drawer";

type UserInfo = {
  email: string,
  name: string,
  image: string,
};

const Header = () => {

  const location = useLocation();

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [drawerStatus, setDrawerStatus] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      setUserInfo({ email: "john@example.com", name: "John Doe", image: "https://static.vecteezy.com/system/resources/previews/033/882/148/non_2x/transparent-background-person-icon-free-png.png" });
    }
  }, []);

  return (
    <div>
      <div className="h-[83px]"></div>
      <div className="w-full flex justify-center fixed top-0 left-0 z-50 bg-white shadow-md">
        <div className="flex w-full max-w-6xl gap-4 py-6 items-center px-2">
          <Link to="/">
            <img className="h-8 object-cover" alt="" src="https://www.strunkmedia.com/wp-content/uploads/2018/05/bigstock-Print-163213010.png" />
          </Link>
          {
            location.pathname === "/search"
              ? (
                <div className="flex-grow">
                </div>
              ) : (
                <Link to={"/search"} className="hidden md:flex flex-grow rounded-full border-2 items-center">
                  <SearchIcon className="mx-1" />
                  <p className="text-lg">검색</p>
                </Link>
              )
          }
          <div className="flex-grow block md:hidden" />
          <Link to={"/"} className="hidden md:block text-lg font-bold">
            도움말
          </Link>
          {
            userInfo === null ? (
              <div onClick={() => setModalStatus(true)} className="text-lg font-bold">
                로그인
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <div className="hidden md:flex items-center bg-blue-500 text-white rounded-full p-1">
                  <img src={userInfo.image} alt="" className="h-7 bg-white rounded-full  overscroll-contain" />
                  <p className="text-base font-bold px-2">{userInfo.name}</p>
                </div>
                <NotificationsNoneIcon fontSize="large" />
              </div>
            )
          }
          <div onClick={() => setDrawerStatus(true)}>
            <MenuIcon fontSize="large" />
          </div>
          <Drawer status={drawerStatus} setStatus={setDrawerStatus} setModalStatus={setModalStatus} />
          <LoginModal status={modalStatus} setStatus={setModalStatus} />
        </div>
      </div>
    </div >
  );
};

export default Header;