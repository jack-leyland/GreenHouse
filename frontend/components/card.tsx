import React from "react";

interface props {
    children: React.ReactChild | React.ReactChildren,
    style: string,
  }

export default function Card({children, style} : props) {
    const cardStyle = "animate-fade hover:scale-105 hover:cursor-pointer shadow-lg rounded-lg w-full h-full " + style
    return(
        <div className={cardStyle}>
            <div className="p-3 text-xs h-full w-full">
                {children}
            </div>
        </div>
    )
}