import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imgURL = useSelector((state) => state.cineworldData.imageURL);

  const mediaType = data.media_type ? data.media_type : media_type;
  const rating = data.vote_average?.toFixed(1);

  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full min-w-[230px] md:min-w-[250px] max-w-[230px] md:max-w-[250px] min-h-80 overflow-hidden block rounded relative hover:scale-105 transition-all"
    >
      {data?.poster_path ? (
        <img src={imgURL + data?.poster_path} alt={data.title || data.name} className="w-full" />
      ) : (
        <div className="h-full w-full bg-neutral-800 flex items-center justify-center">
          <p>Image not available</p>
        </div>
      )}

      <div className="w-[70%] absolute top-0">
        {trending && (
          <div className="text-white text-sm px-[6px] py-1 w-full bg-gradient-to-r from-red-700 to-transparent">
            #{index} Trending 🔥
          </div>
        )}
      </div>

      <div className="absolute bottom-0 h-16 text-white w-full backdrop-blur-2xl bg-gradient-to-r from-red-800 to-transparent p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>

        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-300">
            {moment(data?.release_date || data?.first_air_date).format(
              "MMMM Do YYYY"
            )}
          </p>
          {rating >= 0 && (
            <div
              className="text-sm text-yellow-300 mr-1 flex items-center gap-1"
              title="Rating"
            >
              <i class="ri-star-fill"></i>
              <p>{rating}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
