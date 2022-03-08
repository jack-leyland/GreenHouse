import React, { Dispatch, SetStateAction } from "react";
//Might move these out of types (below)
import {
  epcCertificateObject,
  epcColorDictionary,
  epcIndexDictionary,
  packagedAnalyticsObject,
} from "../../types";
import { AiFillQuestionCircle } from "react-icons/ai";

interface props {
  data: epcCertificateObject["Main"];
  analytics: packagedAnalyticsObject["main"];
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function EpcChart({ data, analytics, setModalHandler }: props) {
  const currentRatingIndexStyle = `relative animate-flyUp text-white mx-4 h-1/2 md:h-1/2 w-2/3 text-center col-start-1 my-1 h-full row-start-${
    epcIndexDictionary[data.currentEnergyRating]
  } bg-${epcColorDictionary[data.currentEnergyRating]}`;
  const potentialRatingIndexStyle = `relative animate-flyUp text-white mx-4 h-1/2 md:h-1/2 w-2/3 text-center col-start-2 px-1 my-1 h-full row-start-${
    epcIndexDictionary[data.potentialEnergyRating]
  } bg-${epcColorDictionary[data.potentialEnergyRating]}`;

  const labelStyling =
    " pr-1 shadow-xs animate-widthGrow text-right font-bold text-white";

  return (
    <div className="flex h-5/6">
      <div className="grid rating-grid w-2/6 h-full">
        <div className="row-start-1 flex items-center">
          <button
            onClick={() => setModalHandler("epcChart")}
            className="mr-2 font-semibold md:text-base text-xs md:hover:no-underline hover:underline"
          >
            EPC Rating
          </button>
          <AiFillQuestionCircle
            size={16}
            className="hover:cursor-pointer hidden md:flex"
            onClick={() => setModalHandler("epcChart")}
          />
        </div>

        <div className="w-4/12 my-1 row-start-2">
          <div className={"bg-epcA" + labelStyling}>A</div>
        </div>

        <div className="w-5/12 my-1 row-start-3">
          <div className={"bg-epcB" + labelStyling}>B</div>
        </div>

        <div className="w-6/12 my-1 row-start-4">
          <div className={"bg-epcC" + labelStyling}>C</div>
        </div>

        <div className="w-7/12 my-1 row-start-5">
          <div className={"bg-epcD" + labelStyling}>D</div>
        </div>

        <div className="w-8/12 my-1 row-start-6">
          <div className={"bg-epcE" + labelStyling}>E</div>
        </div>

        <div className="w-9/12 my-1 row-start-7">
          <div className={"bg-epcF" + labelStyling}>F</div>
        </div>

        <div className="w-10/12 my-1 eighth-row">
          <div className={"bg-epcG" + labelStyling}>G</div>
        </div>
      </div>

      <div className="w-2/6 h-full grid rating-grid grid-cols-2">
        <div className="row-start-1 text-xs col-start-1 flex items-center justify-center">
          <button
            onClick={() => setModalHandler("currentRating")}
            className="md:mr-2 font-semibold md:text-base text-xs hover:underline"
          >
            Current
          </button>
          <AiFillQuestionCircle
            size={16}
            className="hover:cursor-pointer hidden md:flex"
            onClick={() => setModalHandler("currentRating")}
          />
        </div>
        <div className="row-start-1 text-xs col-start-2 flex items-center justify-center">
          <button
            onClick={() => setModalHandler("potentialRating")}
            className="md:mr-2 font-semibold md:text-base text-xs hover:underline"
          >
            Potential
          </button>
          <AiFillQuestionCircle
            size={16}
            className="hover:cursor-pointer hidden md:flex"
            onClick={() => setModalHandler("potentialRating")}
          />
        </div>
        <div className={currentRatingIndexStyle}>
          {data.currentEnergyEfficiency}
        </div>
        <div className={potentialRatingIndexStyle}>
          {data.potentialEnergyEfficiency}
        </div>
      </div>
      <div className="border border-r-1 border-l-0 border-y-0 pl-2"></div>

      <div className="w-2/6 h-full px-2 flex flex-col justify-between text-center">
        <div>
          <div className="font-semibold md:text-base text-sm underline">
            Your House
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="py-1 md:text-base text-xs">
              Score: <b>{data.currentEnergyEfficiency}</b>
            </div>
            <div className="pb-2 md:text-base text-xs">
              Rating: <b>{data.currentEnergyRating}</b>{" "}
            </div>
          </div>
        </div>
        <div className="border border-x-0 border-t-0"></div>
        <div>
          <div className="font-semibold md:text-base text-sm pt-2 underline">
            Area Average
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="py-1 md:text-base text-xs ">
              Score: <b>{analytics.meanCurrentEnergyEfficiency}</b>
            </div>
            <div className="pb-2 md:text-base text-xs ">
              Rating: <b>{analytics.meanCurrentEnergyRating}</b>{" "}
            </div>
          </div>
        </div>
        <div className="border border-x-0 border-t-0 "></div>

        <div>
          <div className="font-semibold md:text-base text-sm pt-2 underline">
            U.K. Average
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="py-1 md:text-base text-xs ">
              Score: <b className={`text-${epcIndexDictionary["D"]}`}>60</b>
            </div>
            <div className="pb-2 md:text-base text-xs ">
              Rating: <b className={`text-${epcIndexDictionary["D"]}`}>D</b>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
