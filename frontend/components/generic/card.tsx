import React, { Dispatch, SetStateAction } from "react";

interface props {
  children?: React.ReactChild | React.ReactChildren | never[];
  style?: string;
  disableHoverAnimation?: boolean;
  onHover?: Dispatch<SetStateAction<boolean>>;
  onClick?: Dispatch<SetStateAction<boolean>>;
  showShadow?: boolean;
  minDims?: {
    w: string;
    h: string;
  };
}

export default function Card({
  children,
  style = "",
  onHover,
  onClick,
  disableHoverAnimation = false,
  showShadow = true,

}: props) {
  const hover = " hover:scale-105 hover:cursor-pointer";
  const shadow = " shadow-lg";
  const cardStyle =
    "animate-fade rounded-lg w-full h-full bg-white " +
    style +
    (disableHoverAnimation ? "" : hover) +
    (showShadow ? shadow : "")

  return (
    <div
      className={cardStyle}
      onMouseEnter={() => (onHover ? onHover(true) : null)}
      onMouseLeave={() => (onHover ? onHover(false) : null)}
      onClick={() => (onClick ? onClick(true) : null)}
    >
      <div>{children}</div>
    </div>
  );
}
