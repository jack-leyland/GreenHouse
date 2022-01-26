import React from "react";

interface props {
    icon: React.ReactChild | React.ReactChildren;
    label: string
  }

export default function SidebarItem({icon, label} : props) {
    return(
        <a className="hover:cursor-pointer flex justify-start gap-3 px-2 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg hover:bg-lightGreen focus:bg-gray-200 focus:outline-none focus:shadow-outline">{icon}{label}</a>
    )
}