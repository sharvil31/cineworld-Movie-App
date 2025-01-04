import React from "react";
import useFetchDetails from "../hooks/useFetchDetails";

const PlayTrailer = ({ data, close, mediaType }) => {
  const { data: trailerData } = useFetchDetails(
    `/${mediaType}/${data?.id}/videos`
  );
  console.log("trailerData", trailerData);

  return (
    <section className="fixed bg-neutral-700 inset-0 z-40 bg-opacity-40 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative">
        <button
          onClick={close}
          className="absolute -top-8 lg:-top-9 right-1 lg:right-0 text-2xl lg:text-3xl"
        >
          <i class="ri-close-large-fill"></i>
        </button>

        {trailerData?.results?.[0]?.key ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerData?.results[0]?.key}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="text-white text-2xl flex justify-center items-center h-full">
            Trailer not available
          </div>
        )}
      </div>
    </section>
  );
};

export default PlayTrailer;
