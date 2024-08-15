import { useEffect, useState } from "react";

type SpaceType = {
  category: string,
  image: string,
  name: string,
};

const mockSpaceTypeList: SpaceType[] = [
  {
    category: "모임",
    image: "",
    name: "파티룸",
  },
  {
    category: "모임",
    image: "",
    name: "스터디룸",
  },
  {
    category: "모임",
    image: "",
    name: "회의실",
  },
  {
    category: "모임",
    image: "",
    name: "세미나실",
  },
  {
    category: "연습",
    image: "",
    name: "합주실",
  },
  {
    category: "연습",
    image: "",
    name: "댄스연습실",
  },
  {
    category: "연습",
    image: "",
    name: "녹음실",
  },
  {
    category: "촬영",
    image: "",
    name: "촬영스튜디오",
  },
  {
    category: "촬영",
    image: "",
    name: "라이브방송",
  },
];

const SpaceCatrgories = () => {

  const [spaceTypeList, setSpaceTypeList] = useState<SpaceType[]>([]);
  const [spaceCategory, setSpaceCategory] = useState<string>("all");

  const fetchSpaceTypeList = async () => {

    setSpaceTypeList(mockSpaceTypeList);
  }


  useEffect(() => {
    fetchSpaceTypeList();
  }, []);

  return (
    <div className="w-full max-w-4xl">
      <div className="flex w-full text-xl font-bold   ">
        <div onClick={() => setSpaceCategory("all")}
          className={`flex-grow border-b-2 text-center pb-2 transition
                    ${spaceCategory === "all" ? "text-blue-500" : "text-gray-400"}
                    ${spaceCategory === "all" ? "border-blue-500" : "border-gray-200"}`}>
          전체
        </div>
        {
          spaceTypeList.filter((item, index, array) => {
            return array.findIndex(i => i.category === item.category) === index;
          }).map((e, i) => (
            <div key={`type_${i}`} onClick={() => setSpaceCategory(e.category)}
              className={`flex-grow border-b-2 text-center pb-2 transition
                        ${spaceCategory === e.category ? "text-blue-500" : "text-gray-400"}
                        ${spaceCategory === e.category ? "border-blue-500" : "border-gray-200"}`}>
              {e.category}
            </div>
          ))
        }
      </div>
      <div className="flex flex-wrap w-full gap-4 my-4">
        {
          spaceTypeList.filter((e) => {
            return spaceCategory === "all" ? true : e.category === spaceCategory;
          }).map((e, i) => (
            <div key={`category_${i}`}
              className="flex flex-col w-24 items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full">
              </div>
              <div className="text-base my-2">
                {e.name}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SpaceCatrgories;