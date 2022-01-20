import React from "react";

interface CardProps {
    children: React.ReactChild | React.ReactChildren;
  }

export default function Card({children} : CardProps) {
    return(
        <div className="shadow-md rounded-md w-56">
            {children}
        </div>
    )
}