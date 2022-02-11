import React from 'react';
import { Dispatch, SetStateAction } from 'react';

interface props {
  children?: React.ReactChild | React.ReactChildren | never[];
  style: string;
  letterColor?: string;
  disableHoverAnimation: boolean;
  onHover?: Dispatch<SetStateAction<boolean>>;
  showShadow: boolean;
}

export default function Card({
  children,
  style,
  onHover,
  disableHoverAnimation,
  showShadow,
}: props) {
  const hover = ' hover:scale-105 ';
  const shadowAndCursor = ' shadow-lg hover:cursor-pointer ';
  const cardStyle =
    'animate-fade rounded-lg w-full h-full ' +
    style +
    (disableHoverAnimation ? '' : hover) +
    (showShadow ? shadowAndCursor : '');
  return (
    <div
      className={cardStyle}
      onMouseEnter={() => (onHover ? onHover(true) : null)}
      onMouseLeave={() => (onHover ? onHover(false) : null)}
    >
      <div className="p-3 text-xs h-full w-full">{children}</div>
    </div>
  );
}
