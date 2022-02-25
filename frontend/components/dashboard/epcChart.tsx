import React from "react";
//Might move these out of types (below)
import { epcColorDictionary, epcIndexDictionary } from "../../types";
import { AiFillQuestionCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

interface props {
  currentEfficiency: number;
  potentialEfficiency: number;
}

function scoreToRating(score: number) {
  switch (true) {
    case score <= 20:
      return "G";
    case score <= 38:
      return "F";
    case score <= 54:
      return "E";
    case score <= 68:
      return "D";
    case score <= 80:
      return "C";
    case score <= 91:
      return "B";
    case score <= 100:
      return "A";
    default:
      return "G";
  }
}

export default function EpcChart({
  currentEfficiency,
  potentialEfficiency,
}: props) {
  const currentRating = scoreToRating(currentEfficiency);
  const potentialRating = scoreToRating(potentialEfficiency);

  const currentRatingIndexStyle = `relative animate-flyUp text-white mx-4 h-2/3 text-center col-start-1 px-1 my-1 h-full row-start-${epcIndexDictionary[currentRating]} bg-${epcColorDictionary[currentRating]}`;
  const potentialRatingIndexStyle = `relative animate-flyUp text-white mx-4 h-2/3 text-center col-start-2 px-1 my-1 h-full row-start-${epcIndexDictionary[potentialRating]} bg-${epcColorDictionary[potentialRating]}`;

  return (
    <div className="flex h-5/6">
      <div className="grid rating-grid w-2/6 h-full">
        <ReactTooltip effect="solid" />
        <div className="row-start-1 flex items-center">
          <span className="mr-2">EPC Rating Chart</span>
          <a data-tip="Properties are given a rating from A (most efficient) to G (least efficient).">
            <AiFillQuestionCircle size={10} />
          </a>
        </div>

        <div className="w-4/12 my-1 row-start-2">
          <div className="bg-epcA pr-1 shadow-sm animate-widthGrow text-right font-bold text-white">
            A
          </div>
        </div>

        <div className="w-5/12 my-1 row-start-3">
          <div className="bg-epcB pr-1 shadow-sm animate-widthGrow text-right font-bold text-white">
            B
          </div>
        </div>

        <div className="w-6/12 my-1 row-start-4">
          <div className="bg-epcC pr-1 shadow-sm animate-widthGrow text-right font-bold text-white">
            C
          </div>
        </div>

        <div className="w-7/12 my-1 row-start-5">
          <div className="bg-epcD pr-1 shadow-sm animate-widthGrow text-right font-bold text-white">
            D
          </div>
        </div>

        <div className="w-8/12 my-1 row-start-6">
          <div className="bg-epcE pr-1 shadow-sm animate-widthGrow text-right font-bold text-white">
            E
          </div>
        </div>

        <div className="w-9/12 my-1 row-start-7">
          <div className="bg-epcF pr-1 shadow-sm animate-widthGrow text-right font-bold text-white">
            F
          </div>
        </div>

        <div className="w-10/12 my-1 eighth-row">
          <div className="bg-epcG pr-1 shadow-sm animate-widthGrow text-right font-bold text-white">
            G
          </div>
        </div>
      </div>

      <div className="w-2/6 h-full grid rating-grid grid-cols-2">
        <div className="row-start-1 text-xs col-start-1 flex items-center justify-center">
          <span className="pr-1">Current</span>
          <ReactTooltip effect="solid" />
          <a data-tip="The current performance rating of your house">
            <AiFillQuestionCircle size={10} />
          </a>
        </div>
        <div className="row-start-1 text-xs col-start-2 flex items-center justify-center">
          <span className="pr-1">Potential</span>
          <ReactTooltip effect="solid" />
          <a data-tip="The rating you could achieve if all improvements are made">
            <AiFillQuestionCircle size={10} />
          </a>
        </div>
        <div className={currentRatingIndexStyle}>
          {currentEfficiency} | {currentRating}
        </div>
        <div className={potentialRatingIndexStyle}>
          {potentialEfficiency} | {potentialRating}
        </div>
      </div>

      <div className="w-2/6 h-full h-full border border-r-0 border-y-0">
        <div className="pb-1 underline text-sm px-4">How you compare:</div>
        <div className="py-2 px-4">
          The average energy rating for houses in your area is ? with a score of
          ?
        </div>
        <div className="py-2 px-4">
          The average energy rating across England and Wales is{" "}
          <b className={`text-${epcIndexDictionary["D"]}`}>D</b> with a score of{" "}
          <b className={`text-${epcIndexDictionary["D"]}`}>60</b>
        </div>
      </div>
    </div>
  );
}
