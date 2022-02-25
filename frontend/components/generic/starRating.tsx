import React from 'react';
const StarRatings = require("react-star-ratings").default;
import {AiOutlineStar} from 'react-icons/ai';

interface props {
    title: string;
    rating?: number;
    areaAverage?: number;
}

export default function StarRating({
    title,
    rating,
    areaAverage
}: props) {
  
  return (
    <div className='py-2 flex items-center gap-6'>
    <div className="flex items-center">
      <b className="pr-2">{title}:</b>
        <StarRatings
          rating={rating ? rating : 0}
          starRatedColor= {rating ? rating > 2 ? "green" : "red" : "gray"}
          numberOfStars={5}
          name='rating'
          starDimension="15px"
        />
    </div>
      <div className="text-sm flex items-center justify-center italic">(Area average: {areaAverage} <AiOutlineStar/>)</div>
  </div>
  );
}