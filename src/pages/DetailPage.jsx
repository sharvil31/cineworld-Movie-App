import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import useFetch from "../hooks/useFetch";
import CardSlider from "../components/CardSlider";
import PlayTrailer from "../components/PlayTrailer";

const DetailPage = () => {
  const imgURL = useSelector((state) => state.cineworldData.imageURL);
  const params = useParams();
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );

  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );

  const { data: recommendationsData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  // console.log("Data", data);
  // console.log("castData", castData);

  

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
  // console.log(data.number_of_seasons);
  const genres = data?.genres?.map((genre) => genre.name);
  // console.log(genres);

  const [playTrailer, setPlayTrailer] = useState(false);
  const [trailerId, setTrailerId] = useState("");


  const director = castData?.crew
    ?.filter((el) => el.job === "Director")
    .map((el) => el.name)
    ?.join(", ");

  const writer = castData?.crew
    ?.filter((el) => el.job === "Screenplay" || "Original Concept" || "Novel")
    .map((el) => el.name)
    ?.join(", ");

  const producer = castData?.crew
    ?.filter((el) => el.job === "Producer")
    .map((el) => el.name)
    ?.join(", ");
  // console.log("producer", producer);


  const handlePlayTrailer = (data) => {
    setTrailerId(data);
    setPlayTrailer(true);
  }


  return (
    <div>
      <div className="w-full h-[320px] lg:h-[300px] relative">
        <div className="w-full h-full">
          <img
            src={imgURL + data?.backdrop_path}
            alt={data.title || data.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/100 to-neutral-900/40 lg:bg-gradient-to-t lg:from-neutral-900/90 lg:to-transparent"></div>
      </div>

      <div className="lg:px-12 pt-20 lg:py-0 flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="absolute lg:relative flex flex-col top-24 lg:top-0 lg:-mt-28 lg:ml-0 mx-auto w-full lg:w-fit">
          <div className="flex items-center justify-center flex-col mx-auto w-60">
          <img
            src={imgURL + data?.poster_path}
            alt={data.title || data.name}
            className="h-80 w-60 object-cover rounded mx-auto lg:mx-0 shadow-2xl shadow-black"
          />

          <button onClick={() => handlePlayTrailer(data)} className="w-full mx-auto py-2 bg-white text-rose-500 hover:text-white hover:bg-gradient-to-r from-red-700 to-amber-500 active:scale-100 hover:scale-105 transition-all duration-200 text-xs md:text-lg font-semibold rounded mt-5 cursor-pointer">
            <i class="ri-play-fill ri-lg mr-[2px]"></i>
            Play Now
          </button>
          </div>
        </div>

        <div className="mt-28 lg:mt-6 px-4 lg:px-0">
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-300 text-sm lg:text-base mt-3">
            {genres?.join(", ")}
          </p>
          <div className="w-[80%] md:w-[100%] h-1 md:h-[5px] bg-gradient-to-r from-red-600 to-transparent mt-3"></div>

          <div className="flex items-center gap-3 text-sm lg:text-base mt-4 mb-6">
            <div className="text-yellow-300 flex gap-1" title="Rating">
              <i class="ri-star-fill text-neutral-300"></i>
              <p>{data?.vote_average?.toFixed(1)}+</p>
            </div>
            <p className="text-red-500 font-semibold">|</p>

            <div className="text-yellow-300 flex gap-1" title="View">
              <i class="ri-eye-fill text-neutral-300"></i>
              <p>{data?.vote_count}</p>
            </div>
            <p className="text-red-500 font-semibold">|</p>

              <div
              className="text-yellow-300 flex gap-1"
              title={data.runtime && "Duration"}
            >
              {data?.runtime ? (
                <i class="ri-timer-fill text-neutral-300"></i>
              ) : data.number_of_seasons ? (
                <i class="ri-play-list-2-fill text-neutral-300"></i>
              ) : "" }
              <p>
                {data?.runtime
                  ? `${duration[0]}h ${duration[1]}m`
                  : data.number_of_seasons ? `${data?.number_of_seasons} Seasons` : ""}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Overview</h3>
            <div className="w-[50%] md:w-[100%] h-1 bg-gradient-to-r from-red-600 to-transparent mt-2"></div>
            <p className="mt-2 text-sm md:text-lg">{data?.overview}</p>

            <div className="text-yellow-400 flex gap-3 text-sm lg:text-base mt-4">
              <p className="text-nowrap">Status : {data?.status}</p>
              <p className="text-red-500 font-semibold">|</p>

              <div className="flex gap-2" title="Release Date">
                <i class="ri-calendar-2-fill text-neutral-300"></i>
                <p className="text-nowrap">
                  {moment(data?.release_date || data?.first_air_date).format(
                    "MMMM Do YYYY"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 leading-7 lg:leading-8">
            {director && (
              <p className="mb-3">
                <span className="text-white">Directed By</span> : {director}
              </p>
            )}

            {producer && (
              <p className="mb-3">
                <span className="text-white">Produced By</span> : {producer}
              </p>
            )}

            <p>
              <span className="text-white">Screenplay By</span> : {writer}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="px-4 lg:px-12 text-xl lg:text-3xl text-white font-bold">
          Cast
        </h2>
        <div className="ml-4 lg:ml-12 w-[50%] md:w-[95%] h-1 bg-gradient-to-r from-red-600 to-transparent mt-2"></div>
        <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 lg:gap-8 px-4 lg:px-12 mt-8">
          {castData?.cast
            ?.filter((el) => el.profile_path)
            .map((cast, index) => {
              return (
                <div className="text-center">
                  <div>
                    <img
                      src={imgURL + cast?.profile_path}
                      alt=""
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                  <p className="text-pretty mt-2 text-sm text-center text-white">
                    {cast?.name}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      <div>
        <CardSlider
          data={similarData}
          heading={
            params?.explore === "tv" ? "Similar TV Shows" : "Similar Movies"
          }
          media_type={params.explore}
        />

        <CardSlider
          data={recommendationsData}
          heading={
            params?.explore === "tv"
              ? "Recommended TV Shows"
              : "Recommended Movies"
          }
          media_type={params.explore}
        />
      </div>

      {playTrailer && <PlayTrailer data={trailerId} close={() => setPlayTrailer(false)} mediaType={params?.explore} />}
    </div>
  );
};

export default DetailPage;
