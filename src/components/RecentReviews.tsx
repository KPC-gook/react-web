import { useEffect, useState } from "react";

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
];

const RecentReviews = ({ title, api }: any) => {

  const [spaceList, setSpaceList] = useState<Space[]>([]);

  const fetchAdvertisements = async () => {

    setSpaceList(mockSpaceList);
  }

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  return (
    <div className="relative w-full px-4">
      <div className="absolute flex items-center justify-center w-full h-full top-0 left-0 bg-[#00000080]">
        <div className="max-w-md bg-gray-100 rounded-2xl shadow-md m-2">
          <img src={"https://via.placeholder.com/800x400"} className="w-full rounded-t-xl hover:opacity-50 transition-all" />
          <div className="p-4">
            <p className="text-2xl font-bold">Title</p>
            <div className="flex gap-2">
              <p>★★★★★</p>
              <p className="">Room</p>
            </div>
            <p className="text-gray-500 font-bold py-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, neque et gravida aliquet, arcu nunc sollicitudin nisl... </p>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <p>Location</p>
              </div>
              <div className="flex gap-2">
                <p>⭐️</p>
                <p>score/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-2xl font-bold mb-4 ml-2 left-0 transition-all hover:text-3xl">
        {title}
      </p>
      <div className="grid grid-cols-4 md:grid-cols-9 gap-4 md:gap-6">
        {
          Array.from({ length: 36 }, () => 0).map((e, i) => (
            <div key={`recent_${i}`}
              className="bg-gray-100 rounded-2xl shadow-md">
              <img src={"https://via.placeholder.com/800x400"} className="w-full rounded-t-xl hover:opacity-50 transition-all" />
              <div className="p-4">
                {/* <p className="text-2xl font-bold">Title</p>
                <p className="">Location</p>
                <p className="text-gray-500 font-bold">Lorem ipsum dolo</p> */}
                <div className="flex justify-between pt-2">
                  <div className="flex gap-2">
                    {/* <p>🎸</p>
                    <p>Type</p> */}
                  </div>
                  <div className="flex gap-2">
                    {/* <p>⭐️</p>
                    <p>score/5.0</p> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default RecentReviews;