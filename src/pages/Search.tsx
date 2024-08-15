import Header from "../components/_header";
import Footer from "../components/_footer";
import SearchIcon from '@mui/icons-material/Search';
import AdvertisementSlider from "../components/AdvertisementSlider";
import SpaceCatrgories from "../components/SpaceCatrgories";
import AllianceSlider from "../components/AllianceSlider";
import SpacesHot from "../components/SpacesRank";
import RecentReviews from "../components/RecentReviews";
import { useRef, useState } from "react";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ViewListIcon from '@mui/icons-material/ViewList';
import AppsIcon from '@mui/icons-material/Apps';
import MapIcon from '@mui/icons-material/Map';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SwapVertIcon from '@mui/icons-material/SwapVert';

type SpaceInfo = {
  id: number;
  title: string;
  location: string;
  tag: string[];
  desc: string;
  type: string;
  score: number;
  review: number;
  like: number;
  image: string;
}

const sortList: string[] = [
  "추천순",
  "가격순",
  "등록일순",
  "리뷰순"
];

const Search = () => {
  const topDivRef = useRef<HTMLDivElement | null>(null);
  const mockSpaceInfo: SpaceInfo[] = [
    {
      id: 1,
      title: "title",
      location: "서울특별시 강남구",
      tag: ["tag1", "tag2", "tag3"],
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, neque et gravida aliquet, arcu nunc sollicitudin nisl...",
      type: "합주실",
      score: 4.5,
      review: 6,
      like: 13,
      image: "https://via.placeholder.com/600x400",
    },
    {
      id: 1,
      title: "title",
      location: "서울특별시 강남구",
      tag: ["tag1", "tag2", "tag3"],
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, neque et gravida aliquet, arcu nunc sollicitudin nisl...",
      type: "합주실",
      score: 4.5,
      review: 6,
      like: 13,
      image: "https://via.placeholder.com/600x400",
    },
    {
      id: 1,
      title: "title",
      location: "서울특별시 강남구",
      tag: ["tag1", "tag2", "tag3"],
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, neque et gravida aliquet, arcu nunc sollicitudin nisl...",
      type: "합주실",
      score: 4.5,
      review: 6,
      like: 13,
      image: "https://via.placeholder.com/600x400",
    },
    {
      id: 1,
      title: "title",
      location: "서울특별시 강남구",
      tag: ["tag1", "tag2", "tag3"],
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, neque et gravida aliquet, arcu nunc sollicitudin nisl...",
      type: "합주실",
      score: 4.5,
      review: 6,
      like: 13,
      image: "https://via.placeholder.com/600x400",
    },
    {
      id: 1,
      title: "title",
      location: "서울특별시 강남구",
      tag: ["tag1", "tag2", "tag3"],
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, neque et gravida aliquet, arcu nunc sollicitudin nisl...",
      type: "합주실",
      score: 4.5,
      review: 6,
      like: 13,
      image: "https://via.placeholder.com/600x400",
    },
  ];

  const [searchWord, setSearchWord] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<SpaceInfo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<number>(-1);
  const [spaceFocus, setSpaceFocus] = useState<boolean>(false);

  const mockAreaList = [
    "서울특별시", "경기도", "부산", "경남", "인천", "경북", "대구", "충남", "전남", "전북", "충북", "강원", "대전", "광주", "울산", "제주", "세종"
  ];

  const loadSearchResult = async () => {
    setSearchWord("true");
    setSearchResult(mockSpaceInfo);
    console.log(searchWord);
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loadSearchResult();
    }
  }

  return (
    <div ref={topDivRef} className="flex flex-col items-center w-full">
      <Header />
      <div className="flex flex-col items-center w-full max-w-4xl gap-6 py-8 flex-grow p-2  min-h-screen">
        <div className="flex w-full border-2 rounded-full p-2 has-[:focus]:border-black">
          <SearchIcon fontSize="medium" />
          <input type="text" autoFocus className="outline-none w-full" onKeyDown={(e) => activeEnter(e)} />
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full gap-2">
            <div className="flex rounded-xl w-full border-2 items-center">
              <div className="w-full hover:bg-gray-300 p-2 flex items-center" onClick={() => setSelectedFilter(selectedFilter === 0 ? -1 : 0)}>
                <p className="w-full px-2 text-lg">위치</p>
                <div className="hidden md:block">
                  <KeyboardArrowDownIcon fontSize='medium' />
                </div>
              </div>
              <div className="w-full hover:bg-gray-300 p-2 flex items-center border-x-2" onClick={() => setSelectedFilter(selectedFilter === 1 ? -1 : 1)}>
                <p className="w-full px-2 text-lg">날짜</p>
                <div className="hidden md:block">
                  <KeyboardArrowDownIcon fontSize='medium' />
                </div>
              </div>
              <div className="flex items-center px-3 h-full hover:bg-gray-300">
                <FilterAltIcon fontSize="medium" />
              </div>
            </div>
            <div className="w-40 flex rounded-xl border-2 items-center px-2 justify-center gap-1 hover:bg-gray-300">
              <SwapVertIcon fontSize="medium" />
              <p className="text-lg">추천순</p>
            </div>
          </div>
          <div className="relative flex w-full gap-4 justify-center">
            {
              selectedFilter === 0
                ? (
                  <div className="absolute w-auto border-2 rounded-3xl bg-white min-w-96">
                    <div className="flex border-b-2 items-center gap-2 mx-3 mt-3 pb-2">
                      <div className="flex items-center gap-2 w-full">
                        <SearchIcon className="" fontSize='medium' />
                        <input type="text" placeholder="검색" className="text-lg w-full px-2" required={true}
                          onFocus={() => setSpaceFocus(true)} onBlur={() => setSpaceFocus(false)} />
                      </div>
                      <div className="border-l-2 px-2 text-gray-500">
                        <MapIcon />
                      </div>
                    </div>
                    <div className="h-96 ">
                      {
                        spaceFocus === false
                          ? (
                            <div className="flex h-full">
                              <div className="flex flex-col border-r-2 h-full overflow-auto">
                                {
                                  mockAreaList.map((e, i) => (
                                    <div>
                                      {e}
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          ) : (
                            <div className="h-full p-4">
                              <p className="font-bold">최근검색어</p>
                              {
                                (
                                  <div className="h-full w-full flex items-center justify-center">
                                    최근 검색어가 없습니다.
                                  </div>
                                )
                              }
                            </div>
                          )
                      }
                    </div>
                    <div className="bg-blue-300 m-2 p-2 rounded-2xl">
                      <p className="text-lg font-black text-center text-white">지금 내 주변에서 검색</p>
                    </div>
                  </div>
                )
                : ""
            }
          </div>
        </div>
        {
          searchWord ? (
            <div>
              <div className="flex w-full justify-between">
                <form className="flex text-base">
                  {
                    sortList.map((e, i) => (
                      <label key={`$sort_${i}`} className="flex items-center justify-center gap-1 px-2 py-1 has-[:checked]:font-bold has-[:checked]:text-blue-500 has-[:checked]:border-2 has-[:checked]:border-blue-500 rounded-full">
                        <input type="radio" name="sort" className="peer hidden" defaultChecked={i == 0 ? true : false} />
                        <div className="hidden peer-checked:block">✓</div>
                        <span className="">{e}</span>
                        <span className="w-[2px] bg-white h-full hidden peer-checked:block" />
                        <div className="hidden peer-checked:flex items-center">
                          <KeyboardArrowDownIcon fontSize='small' />
                        </div>
                      </label>
                    ))
                  }
                </form>
                <form className="flex">
                  {/* 목록 보기 방식 */}
                  <ViewListIcon fontSize="large" />
                  <AppsIcon fontSize="large" />
                </form>
              </div>
              <hr className="w-full my-4" />
              <div className="flex flex-col gap-4">
                {
                  searchResult.map((e, i) => (
                    <div key={`reserve_${i}`} className="flex gap-6 items-center h-48">
                      <img className="h-full rounded-xl" src={e.image} />
                      <div className="h-full w-full flex flex-col p-2">
                        <p className="text-3xl font-bold">{e.title}</p>
                        <p className="text-xl font-semibold">{e.location}</p>
                        <div className="flex gap-2">
                          {
                            e.tag.map((e, i) => (
                              <p>#{e}</p>
                            ))
                          }
                        </div>
                        <p className="text-gray-500">{e.desc}</p>
                        <div className="h-full" />
                        <div className="flex justify-between">
                          <p>{e.type}</p>
                          <div className="flex gap-2">
                            <p>⭐️ {e.score}/5.0</p>
                            <p>💬 {e.review}</p>
                            <p>❤️ {e.like}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ) : ""
        }
      </div >
      <Footer topDivRef={topDivRef} />
    </div >
  );
};

export default Search;