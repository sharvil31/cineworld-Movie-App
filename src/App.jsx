import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/cineworldSlice";
import Login from "./authentication/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {

  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const res = await axios.get("/trending/all/week");
      dispatch(setBannerData(res.data.results));
      // console.log("response", res);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const fetchConfiguration = async () => {
    try {
      const res = await axios.get("/configuration");
      dispatch(setImageURL(res.data.images.secure_base_url+"original"))
      // console.log("response", );
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, [])

  return (
    <>
    <main className="pb-16 lg:pb-0">
      <Header />
      <div className="min-h-[92.7vh] pb-5 lg:pb-12">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
    </>
  );
};

export default App;
