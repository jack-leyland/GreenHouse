import React from "react";

interface CardProps {
    children: React.ReactChild | React.ReactChildren;
    position: String
  }

export default function Card({children, position} : CardProps) {
    return(
        <div className={`shadow-lg rounded-md w-full h-full ${position}`}>
            <div className="p-5">
                {children}
            </div>
        </div>
    )
}