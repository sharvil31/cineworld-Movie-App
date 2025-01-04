import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
// import CardSliderShimmer from "../components/CardsShimmer";
import CardsShimmer from "../components/CardsShimmer";

const ExplorePage = () => {
  const params = useParams();

  const [pageNo, setPageNo] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);

  // console.log("Params", params.explore);

  const fetchPageData = async () => {
    try {
      const res = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      setPageData((prevData) => {
        return [...prevData, ...res.data.results];
      });
      setTotalPageNo(res.data.total_pages);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      setPageNo((prevPageNo) => prevPageNo + 1);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setPageData([]);
    fetchPageData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <div className="w-full pt-[80px]">
      <div className="mx-auto">
        <div className="mx-auto px-4 lg:px-12">
          <h3 className="capitalize text-lg lg:text-3xl font-semibold my-3">
            Popular {params.explore}
            {params.explore === "tv" ? " shows" : "s"}
          </h3>

          <div className=" w-[50%] md:w-[20%] h-1 md:h-[5px] bg-gradient-to-r from-red-600 to-transparent mt-2 md:mt-2 mb-6"></div>

          <div className=" grid grid-cols-[repeat(auto-fit,250px)] place-content-center lg:place-content-start gap-7">
            {!pageData.length ? (
              <CardsShimmer pageShimmer={true} />
            ) : (
              pageData.map((exploreData) => {
                return (
                  <Card
                    data={exploreData}
                    key={exploreData.id + "explorePage"}
                    media_type={params.explore}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
