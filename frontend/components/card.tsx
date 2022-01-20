import React from "react";

interface CardProps {
    children: React.ReactChild | React.ReactChildren;
    style: String
  }

export default function Card({children, style} : CardProps) {
    return(
        <div className={`bg-white shadow-lg rounded-md w-full h-full ${style}`}>
            <div className="p-3 text-xs">
                {children}
            </div>
        </div>
    )
}