import Header from "../components/_header";
import Footer from "../components/_footer";
import SearchIcon from '@mui/icons-material/Search';
import AdvertisementSlider from "../components/AdvertisementSlider";
import SpaceCatrgories from "../components/SpaceCatrgories";
import AllianceSlider from "../components/AllianceSlider";
import SpacesHot from "../components/SpacesRank";
import RecentReviews from "../components/RecentReviews";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { auth } from "../fbase";


const Home = () => {
  const topDivRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={topDivRef} className="flex flex-col items-center w-full">
      asd
      asd<br/>
      asd<br/>
      asd<br/>
      asd<br/>
      <Header />
      <div className="flex flex-col w-full items-center gap-4">
        <AdvertisementSlider />
        <div className="flex flex-col items-center w-full max-w-4xl gap-6 py-8 px-2">
          <p className="text-2xl font-bold">어떤 곳을 찾으시나요?</p>
          <Link to={"/search"}  className="flex w-full border-2 rounded-full p-2">
            <SearchIcon fontSize="medium"/>
          </Link>
        </div>
        <SpaceCatrgories />
        <AllianceSlider />
        <div className="w-full max-w-6xl flex flex-col gap-12 my-8 md:flex-row px-2">
          <SpacesHot title="이용 HOT 공간 🔥"/>
          <SpacesHot title="인기 TOP 공간 🔝"/>
          <SpacesHot title="최근 NEW 공간 🆕"/>
        </div>
        <RecentReviews />
      </div>
      <Footer topDivRef={topDivRef}/>
    </div>
  );
};

export default Home;