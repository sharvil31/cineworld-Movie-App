import React from "react";
import { NavLink } from "react-router";

const MobileNavigation = () => {
  return (
    <nav className="flex lg:hidden h-16 px-1 bg-neutral-950 bg-opacity-50 backdrop-blur-lg fixed bottom-0 w-full z-40">
      <div className="w-full flex items-center justify-between text-neutral-50">
      <NavLink
          to={"/"}
          className={({ isActive }) =>
            `flex flex-col gap-[6px] items-center justify-center px-3 text-sm hover:text-red-500 ${
              isActive && "text-red-500"
            }`
          }
        >
          <i class="ri-home-4-fill ri-xl"></i>
          <p>Home</p>
        </NavLink>
        
        <NavLink
          to={"/tv"}
          className={({ isActive }) =>
            `flex flex-col gap-[6px] items-center justify-center px-3 text-sm hover:text-red-500 ${
              isActive && "text-red-500"
            }`
          }
        >
          <i class="ri-tv-2-fill ri-xl"></i>
          <p>TV Shows</p>
        </NavLink>

        <NavLink
          to={"/movie"}
          className={({ isActive }) =>
            `flex flex-col gap-[6px] items-center justify-center px-3 text-sm hover:text-red-500 ${
              isActive && "text-red-500"
            }`
          }
        >
          <i class="ri-movie-2-fill ri-xl"></i>
          <p>Movies</p>
        </NavLink>

        <NavLink
          to={"/search"}
          className={({ isActive }) =>
            `flex flex-col gap-[6px] items-center justify-center px-3 text-sm hover:text-red-500 ${
              isActive && "text-red-500"
            }`
          }
        >
          <i class="ri-search-2-line ri-xl"></i>
          <p>Search</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileNavigation;
