import { useEffect, useRef, useState } from "react";
import Advertisement from "../types/Advertisement";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import axios from "axios";

const mockAdvertisements: Advertisement[] = [
    {
        link: "https://via.placeholder.com/1800x300",
        image: "https://via.placeholder.com/1800x300",
        desc: "test1",
    },
    {
        link: "https://via.placeholder.com/1800x300",
        image: "https://via.placeholder.com/1800x300",
        desc: "test2",
    },
    {
        link: "https://via.placeholder.com/1800x300",
        image: "https://via.placeholder.com/1800x300",
        desc: "test3",
    },
];

const AdvertisementSlider = () => {

    const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const [sliderWidth, setSliderWidth] = useState<number>(0);

    const sliderRef = useRef<HTMLDivElement>(null);

    const fetchAdvertisements = async () => {
        axios.get("http://localhost:8080/advertisements")
            .then((res) => {
                // console.log(res.data);
                let newAdvertisements:Advertisement[] = [];
                res.data.map((e: any, i: number) => {
                    let newAdvertisement = {
                        link: e.url,
                        image: e.image,
                        desc: e.title,
                    }
                    // console.log(newAdvertisement);
                    newAdvertisements.push(newAdvertisement);
                })
                setAdvertisements(newAdvertisements);
            })
            .catch((e) => {
                console.log(e);
            });

        // setAdvertisements(mockAdvertisements);
    }

    useEffect(() => {
        const slider = sliderRef.current
        if (slider == null) {
            return;
        }
        const { width } = slider.getBoundingClientRect();
        setSliderWidth(width);

        fetchAdvertisements();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIdx((prev) => (prev === (advertisements.length - 1) ? 0 : (prev + 1)));
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, [currentIdx]);

    const nextSlide = () => {
        setCurrentIdx(() => {
            if (currentIdx === advertisements.length - 1) {
                return 0;
            } else {
                return currentIdx + 1;
            }
        })
    }

    const prevSlide = () => {
        setCurrentIdx(() => {
            if (currentIdx === 0) {
                return advertisements.length - 1;
            } else {
                return currentIdx - 1;
            }
        })
    }

    return (
        <div ref={sliderRef} className="w-full overflow-hidden relative flex items-center bg-slate-500 shadow-md">
            <div className={`flex items-center transition`}
                style={{
                    transform: `translateX(${- sliderWidth * currentIdx}px)`,
                }}>
                {
                    advertisements.map((data, i) => (
                        <div key={"advertisement_image_" + i} style={{ width: sliderWidth }}>
                            <img src={data.image} className="w-full object-contain" />
                        </div>
                    ))
                }
            </div>
            <div className="absolute h-full w-16 flex left-0 items-center justify-center bg-transparent hover:bg-[#00000040] transition"
                onClick={prevSlide}>
                <ChevronLeftIcon fontSize="large" />
            </div>
            <div className="absolute h-full w-16 flex right-0 items-center justify-center bg-transparent hover:bg-[#00000040] transition"
                onClick={nextSlide}>
                <ChevronRightIcon fontSize="large" />
            </div>
            <ul className="absolute bottom-4 flex w-full justify-center gap-4">
                {
                    advertisements.map((_, i) => (
                        <li
                            key={"advertisement_button_" + i}
                            className={`h-4 w-4 rounded-full bg-white ${i === currentIdx ? 'opacity-100' : 'opacity-50'
                                }`}
                            onClick={() => setCurrentIdx(i)}
                        />
                    ))
                }
            </ul>
        </div>
    );
}

export default AdvertisementSlider;