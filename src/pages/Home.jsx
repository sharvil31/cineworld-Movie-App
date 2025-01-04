import React, { useEffect, useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
// import Card from "../components/Card";
import CardSlider from "../components/CardSlider";
import axios from "axios";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.cineworldData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedMoviesData } = useFetch("/movie/top_rated");
  const { data: populatTVSeriesData } = useFetch("/tv/popular");
  const { data: topRatedTVSeriesData } = useFetch("/tv/top_rated");

  
  return (
    <div>
      <BannerHome />
      <CardSlider data={trendingData} heading={"Trending Shows"} trending={true} />
      <CardSlider data={nowPlayingData} heading={"Now Playing"} media_type={"movie"} />
      <CardSlider data={topRatedMoviesData} heading={"Top Rated Movies"} media_type={"movie"} />
      <CardSlider data={populatTVSeriesData} heading={"Popular TV Series"} media_type={"tv"} />
      <CardSlider data={topRatedTVSeriesData} heading={"Top Rated TV Series"} media_type={"tv"} />
    </div>
  );
};

export default Home;
