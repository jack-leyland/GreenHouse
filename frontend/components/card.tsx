import React from "react";
import {Dispatch, SetStateAction} from "react";

interface props {
  children?: React.ReactChild | React.ReactChildren | never[];
  style: string;
  onHover?:  Dispatch<SetStateAction<boolean>>;
}

export default function Card({ children, style, onHover }: props) {
  const cardStyle =
    "animate-fade hover:scale-105 hover:cursor-pointer shadow-lg rounded-lg w-full h-full " +
    style;
  return (
    <div 
      className={cardStyle}
      onMouseEnter={() => onHover ? onHover(true) : null}
      onMouseLeave={() => onHover ? onHover(false) : null}
    >
      <div className="p-3 text-xs h-full w-full">{children}</div>
    </div>
  );
}
