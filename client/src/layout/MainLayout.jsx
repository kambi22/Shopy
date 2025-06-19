import React from "react"

import { Outlet } from "react-router";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";


// MainLayout.jsx
const MainLayout = (props) => {
  return (
    <div className="flex ">
      <Sidebar className="w-64 shrink-0" /> {/* Fixed width, won't shrink */}
      <div className="flex-none grow w-90 ">{/*  grow take all remaining width*/}
        <Navbar />
        <div className=" h-full">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
};
export default MainLayout