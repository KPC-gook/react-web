
import { useEffect, useState } from 'react';
import './_drawer.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserInfo from '../types/UserInfo';
import SearchIcon from "@mui/icons-material/Search";

const Drawer = ({ status, setStatus, setModalStatus }: any) => {

  const location = useLocation();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (localStorage.getItem('id') !== null) {
      setUserInfo({
        email: "john@example.com",
        name: "John Doe",
        phone: "010-1234-5678",
        birth: new Date(),
        gender: "male",
        image: "https://static.vecteezy.com/system/resources/previews/033/882/148/non_2x/transparent-background-person-icon-free-png.png"
      });
    }
  }, []);

  const handleLogout = async () => {
    await localStorage.clear();
    window.location.reload();
  }

  return (
    <div className={`fixed h-full z-50 right-0 top-0 flex items-center justify-center
        ${status
        ? `w-full`
        : `w-0`}`}>
      <div onClick={() => setStatus(false)}
        className={`h-full fixed right-0 top-0 transition-all
        ${status
            ? `bg-[#00000060] w-full`
            : `bg-transparent w-0`}`}>
      </div>
      <div className={`absolute flex flex-col bg-white z-50 w-96 h-full transition-all
        ${status
          ? `right-0`
          : `-right-96`}`}>
        <div className='relative'>
          {
            userInfo === null
              ? (
                <div className='flex bg-[#4E8AFF] p-6 items-end pt-16 rounded-2xl'>
                  <div className='flex w-full text-2xl font-bold gap-4'>
                    <div className='bg-white rounded-full p-2 flex-grow text-center' onClick={() => { setModalStatus(true) }}>로그인</div>
                    <div className='bg-white rounded-full p-2 flex-grow text-center'>회원가입</div>
                  </div>
                </div>)
              : (
                <div className='flex p-6 items-end text-black'>
                  <div className='flex flex-col flex-grow '>
                    <img src={userInfo!.image} alt="" className="w-24 bg-white rounded-full object-contain border-2" />
                    <div className='flex gap-2 mt-2 items-end'>
                      <p className='text-3xl font-bold'>{userInfo!.name}</p>
                      <div className='bg-blue-500 px-2 text-white rounded-md'>일반계정</div>
                    </div>
                    <p className='text-2xl'>{userInfo!.email}</p>
                  </div>
                  <div>
                    <ArrowDropDownIcon fontSize='large' />
                  </div>
                </div>
              )
          }
          <div className='absolute top-0 right-0 m-3' onClick={() => setStatus(false)} >
            <CloseIcon fontSize='large' />
          </div>
        </div>
        <hr className='' />
        <div className='p-2'>
          <Link to={"/search"} className="my-1 flex rounded-full border-2 items-center">
            <SearchIcon className="mx-2" fontSize='large'/>
            <p className="text-2xl">검색</p>
          </Link>
        </div>
        <hr className='' />
        <div className='flex flex-col flex-grow justify-between w-full p-2'>
          <div className='flex flex-col text-2xl font-bold gap-2'>
            <p onClick={() => {
              if (userInfo === null) {

              } else {
                navigate('/mypage');
              }
            }}
              className={`px-2 ${location.pathname === "/mypage" && "bg-blue-500 py-2 text-white rounded-xl"}`}>마이페이지</p>
            <div className='flex flex-col pl-2 gap-2 text-2xl'>
              <p onClick={() => {
                if (userInfo === null) {

                } else {
                  navigate('/calendar');
                }
              }}
                className={`px-4 ${location.pathname === "/calendar" && "bg-blue-500 py-1 text-white rounded-xl"}`}>예약내역</p>
              <p className={`px-4`}>즐겨찾기</p>
              <p className={`px-4`}>장바구니</p>
              <p className={`px-4`}>입장한 공간</p>
            </div>
            <hr />
            <p className={`px-2`}>소셜페이지</p>
            <div className='flex flex-col pl-2 gap-2 text-2xl'>
              <p className={`px-4`}>친구목록</p>
              <p className={`px-4`}>그룹목록</p>
            </div>
            <hr />
            {/* <p>관리자페이지</p> */}
            <p className={`px-2`}>공지사항</p>
          </div>
          <div className='flex w-full justify-center gap-2 p-2'>
            <p onClick={handleLogout}>로그아웃</p>
            <p>|</p>
            <p>고객센터</p>
            <p>|</p>
            <p>한국어</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer