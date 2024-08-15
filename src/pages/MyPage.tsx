import Header from "../components/_header";
import Footer from "../components/_footer";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { auth } from "../fbase";

type UserInfo = {
  email: string,
  name: string,
  phone: string,
  birth: Date,
  gender: string,
  image: string,
};

const MyPage = () => {
  const topDivRef = useRef<HTMLDivElement | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const getUserToken = async () => {
    const au = auth.currentUser;
    console.log(await auth.currentUser?.getIdToken());
  };

  useEffect(() => {
    getUserToken();

    if (localStorage.getItem('id') !== null) {
      setUserInfo({
        email: "john@example.com",
        name: "John Doe",
        phone: "010-1234-5678",
        birth: new Date('2000-01-01'),
        gender: "male",
        image: "https://static.vecteezy.com/system/resources/previews/033/882/148/non_2x/transparent-background-person-icon-free-png.png"
      });
    }
  }, []);

  return (
    <div ref={topDivRef} className="flex flex-col items-center w-full min-h-screen">
      <Header />
      <div className="flex flex-col items-center w-full max-w-3xl gap-6 py-8 flex-grow px-2">
        {
          userInfo && (
            <div className="flex flex-col w-full gap-6">
              <div className="flex w-full bg-gray-300 p-4 rounded-3xl h-full gap-4 md:items-center md:flex-row items-start flex-col">
                <div className="flex flex-grow items-center">
                  <img src={userInfo!.image} alt="" className="w-20 bg-white rounded-full object-contain" />
                  <div className="flex flex-col flex-grow font-bold px-4">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl">{userInfo.name}</p>
                      <p className="bg-white px-2 rounded-md">일반 계정</p>
                    </div>
                    <p className="text-xl">{userInfo.email}</p>
                  </div>
                </div>
                <p className="text-xl font-bold bg-white py-2 rounded-full px-4 md:w-auto w-full text-center">관리자 계정 전환</p>
              </div>

              <div className="flex flex-col border-2 rounded-2xl p-4">
                <div className="flex w-full gap-4 items-center px-2 peer">
                  <p className="text-2xl font-bold">내 정보</p>
                  <p className="text-xl bg-gray-300 rounded-lg px-2">수정</p>
                  <div className="flex-grow" />
                  <label className="hover:bg-gray-300 rounded-full">
                    <input type="checkbox" name="info" value="info" defaultChecked={true} className="hidden" />
                    <ArrowDropDownIcon fontSize='large' />
                  </label>
                </div>
                <div className="flex flex-col w-full overflow-hidden max-h-0 peer-has-[:checked]:max-h-64 transition-all">
                  <div className="flex text-lg gap-4 border-t-2 p-2 mt-4">
                    <p className="font-bold w-24">닉네임</p>
                    <p className="">{userInfo.name}</p>
                  </div>
                  <div className="flex text-lg gap-4 border-t-2 p-2">
                    <p className="font-bold w-24">전화번호</p>
                    <p className="">{userInfo.phone}</p>
                  </div>
                  <div className="flex w-full md:flex-row flex-col">
                    <div className="flex text-lg gap-4 p-2 w-full border-t-2">
                      <p className="font-bold w-24">생년월일</p>
                      <p className="">{userInfo.birth.toDateString()}</p>
                    </div>
                    <div className="flex text-lg gap-4 p-2 w-full border-t-2">
                      <p className="font-bold md:w-8 w-24">성별</p>
                      <p className="">{userInfo.gender}</p>
                    </div>
                  </div>
                  <div className="flex text-lg gap-4 border-t-2 p-2 justify-between">
                    <p className="font-bold">회원정보 수정</p>
                    <ChevronRightIcon />
                  </div>
                  <div className="flex text-lg gap-4 border-t-2 p-2 justify-between">
                    <p className="font-bold">비밀번호 변경</p>
                    <ChevronRightIcon />
                  </div>
                </div>
              </div>

              <div className="flex flex-col border-2 rounded-2xl p-4">
                <div className="flex w-full gap-4 items-center px-2 peer">
                  <p className="text-2xl font-bold">내 예약</p>
                  <div className="flex-grow" />
                  <label className="hover:bg-gray-300 rounded-full">
                    <input type="checkbox" name="info" value="info" defaultChecked={true} className="hidden" />
                    <ArrowDropDownIcon fontSize='large' />
                  </label>
                </div>
                <div className="flex flex-col w-full overflow-hidden max-h-0 peer-has-[:checked]:max-h-48 transition-all">
                  <div className="flex text-lg gap-4 border-t-2 mt-4 p-2 justify-between">
                    <p className="font-bold">예약내역 확인</p>
                    <ChevronRightIcon />
                  </div>
                  <div className="flex text-lg gap-4 border-t-2 p-2 justify-between">
                    <p className="font-bold">즐겨찾기한 공간</p>
                    <ChevronRightIcon />
                  </div>
                  <div className="flex text-lg gap-4 border-t-2 p-2 justify-between">
                    <p className="font-bold">입장한 공간</p>
                    <ChevronRightIcon />
                  </div>
                  <div className="flex text-lg gap-4 border-t-2 p-2 justify-between">
                    <p className="font-bold">내가 쓴 리뷰</p>
                    <ChevronRightIcon />
                  </div>
                </div>
              </div>

              <div className="flex flex-col border-2 rounded-2xl p-4">
                <div className="flex w-full gap-4 items-center px-2 peer">
                  <p className="text-2xl font-bold">관리중인 공간</p>
                  <div className="flex-grow" />
                  <label className="hover:bg-gray-300 rounded-full">
                    <input type="checkbox" name="info" value="info" defaultChecked={true} className="hidden" />
                    <ArrowDropDownIcon fontSize='large' />
                  </label>
                </div>
                <div className="flex flex-col w-full overflow-hidden h-0 peer-has-[:checked]:h-auto">
                </div>
              </div>

              <div className="hover:bg-red-500 hover:text-white font-bold text-2xl w-full text-center p-2 rounded-2xl
                border-2 border-red-500 transition-all bg-red-50 text-red-500">
                회원탈퇴
              </div>
            </div>
          )
        }
      </div>
      <Footer topDivRef={topDivRef} />
    </div>
  );
};

export default MyPage;