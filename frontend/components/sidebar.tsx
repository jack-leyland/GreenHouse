import React from "react";
import {
  BsFillPinMapFill,
  BsWrench,
  BsFillHouseFill,
  BsFillLightbulbFill,
} from "react-icons/bs";
import SidebarItem from "./sidebarItem";

export default function Sidebar() {
  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen text-gray-500">
      <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
        <div className="flex-shrink-0 py-4 flex flex-row items-center justify-between">
          <nav className="flex-grow md:block pb-4 md:pb-0 md:overflow-y-auto">
            <span className="block pt-2 pb-6 px-6 mt-2 text-4xl font-bold text-emerald">
              GreenHouse
            </span>
            <SidebarItem label={"Overview"} icon={<BsFillHouseFill />} />
            <SidebarItem label={"Recommendations"} icon={<BsWrench />} />
            <SidebarItem label={"Heatmap"} icon={<BsFillPinMapFill />} />
          </nav>
        </div>
      </div>
    </div>
  );
}
