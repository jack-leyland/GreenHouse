import React from "react";
import {BsFillPinMapFill, BsWrench, BsFillHouseFill, BsFillLightbulbFill} from "react-icons/bs"

export default function Sidebar() {
    return(
    <div className="md:flex flex-col md:flex-row md:min-h-screen">
        <div className="flex flex-col w-full md:w-72 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
            <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <nav  className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">  
            <span className="block pt-2 pb-6 mt-2 text-4xl font-bold text-green-400">GreenHouse</span>   
            <a className="flex justify-start gap-3 px-2 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-green-400 focus:bg-gray-200 focus:outline-none focus:shadow-outline"><BsFillHouseFill/>Overview</a>
            <a className="flex justify-start gap-3 px-2 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-green-400 focus:bg-gray-200 focus:outline-none focus:shadow-outline"><BsWrench/>Recommendations</a>
            <a className="flex justify-start gap-3 px-2 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-green-400 focus:bg-gray-200 focus:outline-none focus:shadow-outline"><BsFillPinMapFill/>Heatmap</a>
            <a className="flex justify-start gap-3 px-2 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-green-400 focus:bg-gray-200 focus:outline-none focus:shadow-outline"><BsFillLightbulbFill/>Electricity Predictions</a>
            </nav>
            </div>
        </div>
    </div>
    )
}