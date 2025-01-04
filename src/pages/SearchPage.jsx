import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import CardsShimmer from "../components/CardsShimmer";

const SearchPage = () => {
  const location = useLocation();

  const [pageData, setPageData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q");
  console.log(query);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/search/multi`, {
        params: {
          query: query,
          page: pageNo,
        },
      });
      setPageData((prevData) => {
        return [...prevData, ...res.data.results];
      });
      // setTotalPageNo(res.data.total_pages);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageNo(1);
    setPageData([]);
    fetchPageData();
  }, [location?.search]);

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
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <div className="pt-20">
      <div className="mx-auto w-[80%] md:w-[35%] border-2 bg-neutral-900 py-1 border-white/40 focus-within:border-white/90 h-9 flex lg:hidden items-center rounded-md px-2 mb-6 sticky top-20 z-10">
        <div className="w-full flex items-center">
          <input
            type="text"
            placeholder="Search Movie, TV Show,.."
            className="w-full bg-transparent border-none outline-none mr-2 lg:mr-3 text-xs lg:text-base text-white"
            onChange={(e) => navigate(`/search?q=${e.target.value}`)}
            value={query?.split("%20")?.join(" ")}
          />
          <i class="ri-search-2-line scale-125 text-rose-600 ml-auto"></i>
        </div>
      </div>

      <div className="mx-auto">
        {query ? (
          <>
            <div className="px-4 lg:px-12">
              <h3 className="capitalize text-lg lg:text-2xl font-semibold my-3">
                Search Results
              </h3>
              <div className=" w-[50%] md:w-[20%] h-1 md:h-[5px] bg-gradient-to-r from-red-600 to-transparent mt-2 md:mt-2 mb-6"></div>
            </div>

            {loading ? (
              <CardsShimmer pageShimmer={true} />
            ) : pageData.length === 0 ? (
              <div className="w-full min-h-[35vh] lg:min-h-[40vh] flex items-center justify-center">
                <p className="text-base md:text-xl">Movie/TV Show not found</p>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,230px)] lg:grid-cols-[repeat(auto-fit,250px)] place-content-center px-12 lg:place-content-start gap-7">
                {pageData.map((searchData, index) => {
                  return (
                    <Card
                      data={searchData}
                      key={searchData.id + "searchPage" + index}
                      media_type={searchData.media_type}
                    />
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="w-full min-h-[35vh] lg:min-h-[40vh] flex items-end justify-center">
            <p className="text-base md:text-xl">
              Search Results will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
