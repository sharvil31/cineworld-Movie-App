import React from "react";
import Card from "./Card";

const CardsShimmer = ({ pageShimmer }) => {
  return (
    <div className="w-fit lg:w-[90vw] mx-auto">
      <div
      className={
        pageShimmer
          ? "grid grid-cols-[repeat(auto-fit,250px)] gap-7 mx-auto w-full"
          : "mx-auto grid grid-cols-[repeat(auto-fit,230px)] md:grid-cols-[repeat(auto-fit,250px)] grid-flow-col gap-6 overflow-hidden relative overflow-x-scroll scroll-smooth transition-all removeScrollbar z-10"
      }
    >
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <div
            key={index}
            className="bg-gradient-to-tl from bg-neutral-700 to-neutral-800 h-80 w-60 overflow-hidden rounded relative flex items-center justify-center mx-auto"
          >
            Loading...
            <div className="h-16 w-full bg-neutral-500 flex items-end justify-end absolute bottom-0">
              <div className="w-12 h-6 bg-neutral-400/50"></div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default CardsShimmer;
