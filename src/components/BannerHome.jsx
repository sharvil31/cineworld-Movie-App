import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import "remixicon/fonts/remixicon.css";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.cineworldData.bannerData);
  const imgURL = useSelector((state) => state.cineworldData.imageURL);

  const [currentImg, setCurrentImg] = useState(0);

  const handleNext = () => {
    if (currentImg < bannerData.length - 1) {
      setCurrentImg((prevImg) => prevImg + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImg > 0) {
      setCurrentImg((prevImg) => prevImg - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImg < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImg(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData, currentImg]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => {
          return (
            <div
              key={data.id + "BannerHome" + index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden transition-all duration-500 relative group"
              style={{ transform: `translateX(-${currentImg * 100}%)` }}
            >
              <div key={index} className="w-full h-full">
                <img
                  src={imgURL + data.backdrop_path}
                  alt={data.title || data.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex z-10">
                <button
                  onClick={handlePrevious}
                  className="text-white rounded-full px-2 bg-red-600 hover:bg-red-700 transition-colors cursor-pointer z-10 scale-[0.7] active:scale-75"
                >
                  <i class="ri-arrow-left-s-line ri-2x"></i>
                </button>
                <button
                  onClick={handleNext}
                  className="text-white rounded-full px-2 bg-red-600 hover:bg-red-700 transition-colors cursor-pointer z-10 scale-[0.7] active:scale-75"
                >
                  <i class="ri-arrow-right-s-line ri-2x"></i>
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

              <div className="mx-auto absolute bottom-0 max-w-md px-4 md:pl-12 md:pr-0 z-10">
                <h2 className="text-2xl lg:text-5xl text-white font-bold drop-shadow-2xl">
                  {data.title || data.name}
                </h2>
                <div className="w-[80%] md:w-full h-1 md:h-[5px] bg-gradient-to-r from-red-600 to-transparent mt-2 md:mt-4"></div>
                <p className="text-ellipsis line-clamp-3 my-1 md:my-3 text-xs md:text-base">
                  {data.overview}
                </p>
                <div className="w-full flex items-center gap-2 md:gap-4 text-[11px] md:text-base text-yellow-500">
                  <p>
                    Type : <span className="uppercase">{data.media_type}</span>
                  </p>
                  <p className="text-red-500 font-semibold">|</p>
                  <p>Rating : {data.vote_average.toFixed(1)}+</p>
                  <p className="text-red-500 font-semibold">|</p>
                  <p>View : {data.popularity.toFixed(0)}</p>
                </div>

                <div className="flex gap-3 lg:gap-6">
                  <Link to={"/" + data.media_type + "/" + data.id} className="bg-white text-rose-500 hover:text-white hover:bg-gradient-to-r from-red-700 to-amber-500 active:scale-100 hover:scale-105 transition-all duration-200 text-xs md:text-base py-2 px-4 lg:px-6 font-bold rounded mt-3 cursor-pointer">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
