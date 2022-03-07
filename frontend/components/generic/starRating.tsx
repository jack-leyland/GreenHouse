import React from "react";
const StarRatings = require("react-star-ratings").default;
import { AiFillStar } from "react-icons/ai";
import {starColors} from "../../types";

interface props {
  title: string;
  rating?: number;
  areaAverage?: number;
}



export default function StarRating({ title, rating, areaAverage }: props) {
  return (
    <div className="py-2 flex items-center gap-1">
        <b className="pr-2">{title}:</b>
        <StarRatings
          rating={rating ? rating : 0}
          starRatedColor={rating ? starColors[rating] : "gray"}
          numberOfStars={5}
          name="rating"
          starDimension="12px"
        />
      <div className="text-xs flex items-center justify-center italic">
        (Area average: {areaAverage} <AiFillStar color={areaAverage? starColors[Math.floor(areaAverage)] : "gray"}/>)
      </div>
    </div>
  );
}
