import React, { Dispatch, SetStateAction, useState } from "react";
import { useSpring, a } from "@react-spring/web";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";

interface props {
  front: React.ReactChild | React.ReactChildren | never[];
  back: React.ReactChild | React.ReactChildren | never[];
  frontTitle?: string;
  backTitle?: string;
  style?: string;
  letterColor?: string;
  disableHoverAnimation?: boolean;
  onHover?: Dispatch<SetStateAction<boolean>>;
  showShadow?: boolean;
}

export default function FlippableCard({
  front,
  back,
  frontTitle = "",
  backTitle = "",
  style = "",
  onHover,
  disableHoverAnimation = false,
  showShadow = true,
}: props) {
  const hover = " hover:scale-105 hover:cursor-pointer ";
  const shadow = " shadow-lg ";
  const cardStyle =
    "animate-fade rounded-lg w-full h-full relative min-w-[467px] min-h-[240px]" +
    style +
    (disableHoverAnimation ? "" : hover) +
    (showShadow ? shadow : "");

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      className={cardStyle}
      onMouseEnter={() => (onHover ? onHover(true) : null)}
      onMouseLeave={() => (onHover ? onHover(false) : null)}
    >
      <a.div
        className="border rounded-lg content p-3 text-xs h-full w-full"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        <div className="h-full child">
          <h3 className="child text-xl font-bold px-1 pb-1 border border-t-0 border-x-0 flex justify-between items-center">
            {frontTitle}
            <span
              className="flex text-md gap-2 items-center font-light hover:cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-lg"
              onClick={() => set((state) => !state)}
            >
              <span className="text-sm">Flip Card</span>
              <MdOutlineFlipCameraAndroid size={25} />
            </span>
          </h3>
          {front}
        </div>
      </a.div>

      <a.div
        className={
          "border rounded-lg content p-3 text-xs h-full w-full" +
          (flipped ? "" : " hidden")
        }
        style={{
          opacity,
          transform,
          rotateX: "180deg",
        }}
      >
        <div className="h-full child">
          <h3 className="text-xl font-bold px-1 pb-1 border border-t-0 border-x-0 flex justify-between items-center">
            {backTitle}
            <span
              className="flex text-md gap-2 items-center font-thin font-light hover:cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-lg"
              onClick={() => set((state) => !state)}
            >
              <span className="text-sm">Flip Card</span>
              <MdOutlineFlipCameraAndroid size={25} />
            </span>
          </h3>
          {back}
        </div>
      </a.div>
    </div>
  );
}
