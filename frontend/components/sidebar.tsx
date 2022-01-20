import React from "react";
import {BsFillPinMapFill, BsWrench, BsFillHouseFill, BsFillLightbulbFill} from "react-icons/bs"
import SidebarItem from "./sidebarItem";

export default function Sidebar() {
    return(
    <div className="md:flex flex-col md:flex-row md:min-h-screen text-gray-500">
        <div className="flex flex-col w-full md:w-72 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
            <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <nav  className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">  
                <span className="block pt-2 pb-6 mt-2 text-4xl font-bold text-green-600">GreenHouse</span>  
                <SidebarItem label={"Overview"} icon={<BsFillHouseFill/>}/>
                <SidebarItem label={"Recommendations"} icon={<BsWrench/>}/>
                <SidebarItem label={"Heatmap"} icon={<BsFillPinMapFill/>}/>
                <SidebarItem label={"Electricity Predictions"} icon={<BsFillLightbulbFill/>}/>
            </nav>
            </div>
        </div>
    </div>
    )
}