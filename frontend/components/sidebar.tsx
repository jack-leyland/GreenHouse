import React from "react";

export default function Sidebar() {
    return(
    <div className="md:flex flex-col md:flex-row md:min-h-screen">
        <div className="shadow-md flex flex-col w-full md:w-72 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
            <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <nav  className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">  
            <span className="block px-4 py-2 mt-2 text-3xl font-semibold">GreenHouse</span>   
            <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Overview</a>
            <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Reccomendations</a>
            <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Heatmap</a>
            <a className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Electricity Predictions</a>
            </nav>
            </div>
        </div>
    </div>
    )
}