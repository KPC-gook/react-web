import { useEffect, useRef, useState } from "react";
import Advertisement from "../types/Advertisement";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type Space = {
  id: number,
  name: string,
  location: string,
  tag: string[],
  type: string,
  score: number,
  image: string,
};

const mockSpaceList: Space[] = [
  {
    id: 1,
    name: "Space 1",
    location: "서울특별시 강남구",
    tag: ["tag1", "tag2", "tag3"],
    type: "합주실",
    score: 4.5,
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 2,
    name: "Space 2",
    location: "서울특별시 강남구",
    tag: ["tag1", "tag2", "tag3"],
    type: "합주실",
    score: 4.5,
    image: "https://via.placeholder.com/800x400",
  },
  {
    id: 3,
    name: "Space 3",
    location: "서울특별시 강남구",
    tag: ["tag1", "tag2", "tag3"],
    type: "합주실",
    score: 4.5,
    image: "https://via.placeholder.com/800x400",
  },
];

const SpacesRank = ({title, api}: any) => {

  const [spaceList, setSpaceList] = useState<Space[]>([]);

  const fetchAdvertisements = async () => {

    setSpaceList(mockSpaceList);
  }

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  return (
    <div className="w-full ">
      <p className="text-2xl font-bold mb-4 ml-2 left-0 transition-all hover:text-3xl">
        {title}
      </p>
      <div className="flex flex-col gap-8">
        {
          spaceList.map((e, i) => (
            <div key={`${title}_${i}`}
              className="bg-gray-100 rounded-2xl shadow-md">
              <img src={e.image} className="w-full rounded-t-xl hover:opacity-50 transition-all" />
              <div className="p-4">
                <p className="text-2xl font-bold">{e.name}</p>
                <p className="">{e.location}</p>
                <p className="text-gray-500 font-bold">{e.tag.map((e) => ("#" + e + " "))}</p>
                <div className="flex justify-between pt-2">
                  <div className="flex gap-2">
                    <p>🎸</p>
                    <p>{e.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <p>⭐️</p>
                    <p>{e.score}/5.0</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <p className="p-8 w-full text-center text-xl font-bold">더보기</p>
    </div>
  );
}

export default SpacesRank;