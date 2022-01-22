import React from "react";

interface props {
    children: React.ReactChild | React.ReactChildren;
    style: string
  }

export default function Card({children, style} : props) {
    return(
        <div className={`animate-fade hover:scale-105 hover:cursor-pointer bg-white shadow-lg rounded-lg w-full h-full ${style}`}>
            <div className="p-3 text-xs">
                {children}
            </div>
        </div>
    )
}