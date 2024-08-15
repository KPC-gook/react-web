import Header from "../components/_header";
import Footer from "../components/_footer";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import UserInfo from "../types/UserInfo";

type BookingInfo = {
  id: number;
  begin_date: Date;
  end_date: Date;
  title: string;
  location: string;
  status: string;
  room: string;
  people: number;
  image: string;
}


const Calendar = () => {
  const topDivRef = useRef<HTMLDivElement | null>(null);
  const weakStr: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const mockBookingInfo: any = {
    "202408": [
      {
        id: 1,
        begin_date: new Date("2024-08-01T09:00:00"),
        end_date: new Date("2024-08-01T12:00:00"),
        title: "title",
        location: "서울특별시 강남구",
        status: "예약 완료",
        room: "A룸",
        people: 10,
        image: "https://via.placeholder.com/600x400",
      },
      {
        id: 2,
        begin_date: new Date("2024-08-13T18:00:00"),
        end_date: new Date("2024-08-13T21:00:00"),
        title: "title",
        location: "서울특별시 강남구",
        status: "예약 완료",
        room: "A룸",
        people: 10,
        image: "https://via.placeholder.com/600x400",
      },
      {
        id: 3,
        begin_date: new Date("2024-08-15T18:00:00"),
        end_date: new Date("2024-08-16T10:00:00"),
        title: "title",
        location: "서울특별시 강남구",
        status: "예약 완료",
        room: "A룸",
        people: 10,
        image: "https://via.placeholder.com/600x400",
      },
      {
        id: 4,
        begin_date: new Date("2024-08-30T16:00:00"),
        end_date: new Date("2024-08-30T17:00:00"),
        title: "title",
        location: "서울특별시 강남구",
        status: "예약 완료",
        room: "A룸",
        people: 10,
        image: "https://via.placeholder.com/600x400",
      },
      {
        id: 5,
        begin_date: new Date("2024-08-30T18:00:00"),
        end_date: new Date("2024-08-30T21:00:00"),
        title: "title",
        location: "서울특별시 강남구",
        status: "예약 취소",
        room: "A룸",
        people: 5,
        image: "https://via.placeholder.com/600x400",
      },
      {
        id: 6,
        begin_date: new Date("2024-08-30T18:00:00"),
        end_date: new Date("2024-08-30T21:00:00"),
        title: "title",
        location: "서울특별시 강남구",
        status: "예약 대기",
        room: "A룸",
        people: 10,
        image: "https://via.placeholder.com/600x400",
      },
    ]
  };

  const getBookingInfoByMonth = (date: Date) => {
    setBookingInfoList(mockBookingInfo[`${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, "0")}`] ?? []);
  }

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookingInfoList, setBookingInfoList] = useState<BookingInfo[]>([]);

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

    getBookingInfoByMonth(calendarDate);
  }, []);

  // const getDayOfMonth = (year: number, month: number) => {
  //   if (month < 0) {
  //     year = year - 1;
  //     month = 11;
  //   }
  //   if (month > 11) {
  //     year = year + 1;
  //     month = 0;
  //   }
  //   let ret = ([0, 2, 4, 6, 7, 9, 11].includes(month)
  //     ? 31
  //     : month != 1
  //       ? 30
  //       : year % 4 == 0 && year % 100 != 0 || year % 400 == 0
  //         ? 29
  //         : 28
  //   );
  //   return ret;
  // }

  const prevMonth = () => {
    let ret = new Date(calendarDate);
    ret.setDate(1);
    ret.setMonth(ret.getMonth() - 1);

    getBookingInfoByMonth(ret);
    setCalendarDate(ret);
  }

  const nextMonth = () => {
    let ret = new Date(calendarDate);
    ret.setDate(1);
    ret.setMonth(ret.getMonth() + 1);

    getBookingInfoByMonth(ret);
    setCalendarDate(ret);
  }

  const getLastDay = (date: Date) => {
    let ret = new Date(date);
    ret.setDate(1);
    ret.setMonth(ret.getMonth() + 1);
    ret.setDate(0);
    return ret;
  }

  const dayDiv = (month: number, day: number) => {
    let date = new Date();
    date.setDate(1);
    if (month === -1) {
      date.setMonth(date.getMonth() - 1);
    } else if (month === 1) {
      date.setMonth(date.getMonth() + 1);
    }
    date.setDate(day);

    return (
      <div key={`${month}_${day}`} className={`h-28 hover:bg-gray-300 m-1 p-1 rounded-xl border-2
        ${date.toDateString() === selectedDate.toDateString()
          ? "border-gray-200" : "border-transparent"}
        `} onClick={() => { setSelectedDate(date) }}>
        <div className="flex justify-center">
          <p className={`
            flex  items-center justify-center rounded-xl h-6 w-6
            ${date.toDateString() === selectedDate.toDateString()
              ? "bg-blue-500 text-white font-bold"
              : date.toDateString() === new Date().toDateString()
                ? "bg-blue-50 text-blue-500 font-bold border-2 border-blue-500"
                : ""
            }
            ${month && "text-gray-300"}
            `}>{day}</p>
        </div>
        <div>
          {
            bookingInfoList.filter((e) => (
              e.begin_date.toDateString() === date.toDateString()
            )).map((e, i) => (
              <div key={`status_${i}`} className="">
                <p className={`border-l-4 pl-1  my-1 text-sm
                      ${e.status === "예약 취소"
                    ? "border-red-500"
                    : e.status === "예약 대기"
                      ? "border-blue-300"
                      : e.end_date < new Date()
                        ? "border-gray-500"
                        : "border-blue-500"
                  }`}>
                  {e.title}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    );
  };

  const getDateBookingList = () => {
    return (
      <div className="flex flex-col gap-4">
        {
          bookingInfoList.filter((e) => (
            e.begin_date.toDateString() === selectedDate.toDateString()
          )).map((e, i) => (
            <div key={`reserve_${i}`} className="flex gap-6 items-center h-48">
              <img className="h-full rounded-xl" src={e.image} />
              <div className="h-full w-full flex flex-col justify-between p-2">
                <p className="text-3xl font-bold">{e.title}</p>
                <p className="text-xl">{e.location}</p>
                <div className="flex gap-2 text-gray-500 text-base">
                  <p>{e.room}</p>
                  <p>|</p>
                  <p>{e.people}</p>
                </div>
                <div className="flex-grow" />
                <div className="flex justify-between">
                  <p className="text-gray-500">{e.begin_date.toDateString()}</p>
                  <div className="flex items-center gap-2">
                    <p>{e.status}</p>
                    <div className={`h-4 w-4 rounded-full
                      ${e.status === "예약 취소"
                        ? "bg-red-500"
                        : e.status === "예약 대기"
                          ? "bg-blue-300"
                          : e.end_date < new Date()
                            ? "bg-gray-500"
                            : "bg-blue-500"
                      }`} />
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  const getPrevMonthLastDay = (date: Date) => {
    const lastDate = new Date(date);
    lastDate.setDate(0);
    return lastDate;
  }

  return (
    <div ref={topDivRef} className="flex flex-col items-center w-full min-h-screen">
      <Header />
      <div className="flex flex-col items-center w-full max-w-4xl gap-6 py-8 flex-grow">
        {
          userInfo && (
            <div className="w-full">
              <div className="flex justify-between w-full items-center">
                <div onClick={() => prevMonth()} className="rounded-full hover:bg-gray-300">
                  <ChevronLeftIcon fontSize="large" />
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-xl font-semibold">{calendarDate.getFullYear()}년</p>
                  <p className="text-3xl font-bold">{calendarDate.getMonth() + 1}월</p>
                </div>
                <div onClick={() => nextMonth()} className="rounded-full hover:bg-gray-300">
                  <ChevronRightIcon fontSize="large" />
                </div>
              </div>
              <div className="flex justify-between my-4">
                {
                  weakStr.map((e, i) => (
                    <p key={`day_${i}`} className={"w-full text-center font-bold " + (i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "")}>
                      {e}
                    </p>
                  ))
                }
              </div>
              <div className="grid grid-cols-7">
                {
                  Array.from({ length: (getPrevMonthLastDay(calendarDate).getDay() + 1) % 7 }, () => 0).map((e, i) => (
                    dayDiv(-1, getPrevMonthLastDay(calendarDate).getDate() - (getPrevMonthLastDay(calendarDate).getDay() - i))
                  ))
                }
                {
                  Array.from({ length: getLastDay(calendarDate).getDate() }, () => 0).map((e, i) => (
                    dayDiv(0, i + 1)
                  ))
                }
                {
                  Array.from({ length: 7 - (getLastDay(calendarDate).getDay()) - 1 }, () => 0).map((e, i) => (
                    dayDiv(1, i + 1)
                  ))
                }
              </div>
              {
                getDateBookingList()
              }
            </div>
          )
        }
      </div>
      <Footer topDivRef={topDivRef} />
    </div>
  );
};

export default Calendar;