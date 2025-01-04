import React, { useEffect, useState } from "react";
import logo from "../assets/images/app-logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { auth, db } from "../authentication/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Header = () => {
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: "",
  });

  const fetchUserName = async () => {
    auth.onAuthStateChanged(async (user) => {
      // setUserName(user);
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const userDetails = await getDoc(docRef);

          if (userDetails.exists()) {
            const { firstName, lastName } = userDetails.data();
            setUserName({ firstName, lastName });
            console.log(firstName, lastName);
          } else {
            console.log("User in Not Logged in");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        console.log("No user is logged in");
        setUserName({ firstName: "", lastName: "" });
      }
    });
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  const location = useLocation();
  // const filteredQuery = location?.search?.slice(3).split("%20").join(" ");
  const [searchInput, setSearchInput] = useState("");
  const [filteredQuery, setFilteredQuery] = useState("");
  console.log(filteredQuery);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setFilteredQuery(value);
  };

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    } else {
      navigate(`${location.pathname}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilteredQuery(searchInput);
  };

  const truncateName = (name) => {
    if (typeof name === "string") {
      const words = name?.split(" ");
      return words?.length > 2 ? `${words?.slice(0, 2)?.join(" ")}...` : name;
    }
    return "";
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      await signOut(auth);
      // navigate("/login");
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 md:h-20 bg-neutral-950 bg-opacity-50 backdrop-blur-lg z-40">
      <div className="h-full w-[99%] md:w-[95%] mx-auto px-2 flex items-center">
        <Link to={"/"}>
          <img
            src={logo}
            alt="AppLogo"
            className="w-32 h-[30px] lg:w-40 lg:h-10"
          />
        </Link>

        <nav className="hidden lg:flex ml-auto">
          <div className="flex gap-5">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `relative py-2 rounded-[2px] hover:bg-gradient-to-t from-red-700 to-transparent hover:text-white px-[14px] pb-1 font-bold text-[18px] uppercase ${
                  isActive
                    ? "text-xl text-white bg-gradient-to-t from-red-600 to-transparent"
                    : "text-neutral-300"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"/tv"}
              className={({ isActive }) =>
                `relative py-2 rounded-[2px] hover:bg-gradient-to-t from-red-700 to-transparent hover:text-white px-[14px] pb-1 font-bold text-[18px] uppercase ${
                  isActive
                    ? "text-xl text-white bg-gradient-to-t from-red-600 to-transparent"
                    : "text-neutral-300"
                }`
              }
            >
              Tv Shows
            </NavLink>
            <NavLink
              to={"/movie"}
              className={({ isActive }) =>
                `relative py-2 rounded-[2px] hover:bg-gradient-to-t from-red-700 to-transparent hover:text-white px-[14px] pb-1 font-bold text-[18px] uppercase ${
                  isActive
                    ? "text-xl text-white bg-gradient-to-t from-red-600 to-transparent"
                    : "text-neutral-300"
                }`
              }
            >
              Movies
            </NavLink>
          </div>
        </nav>

        <div className="flex items-center justify-center gap-5 lg:gap-8 ml-auto">
          <div className="lg:w-[350px] lg:border-2 py-1 border-white/40 focus-within:border-white/90 h-[30px] lg:h-[38px] flex items-center rounded-md px-2">
            <form
              className="w-full hidden lg:flex items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Search Movie, TV Show,.."
                className="w-full bg-transparent border-none outline-none mr-2 lg:mr-3 text-xs lg:text-base text-white"
                onChange={handleInputChange}
                value={filteredQuery}
              />
              <i class="ri-search-2-line scale-150 text-rose-600 ml-auto"></i>
            </form>
          </div>
          {userName ? (
            <div className="flex gap-2">
              <p className="text-nowrap text-ellipsis">
                {truncateName(userName?.firstName + " " + userName?.lastName)}
              </p>
              <Link
                to={"/login"}
                title="Log out"
                onClick={handleLogout}
                className=" hover:text-white"
              >
                <i class="ri-logout-box-fill ri-lg"></i>
              </Link>
            </div>
          ) : (
            <Link to={"/login"}>
              <div
                title="Login"
                className="flex items-center gap-2 cursor-pointer active:scale-90 transition-all hover:text-white"
              >
                <i class="ri-login-box-fill ri-lg"></i>
                <p>Log in</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
