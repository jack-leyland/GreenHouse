import React, { Dispatch, SetStateAction } from "react";
import { GiWaterDrop, GiFireplace } from "react-icons/gi";
import { BsLightbulb } from "react-icons/bs";
import { epcCertificateObject, packagedAnalyticsObject } from "../../types";
import { AiOutlineArrowRight } from "react-icons/ai";

interface props {
  data: epcCertificateObject["House"]["costs"];
  analytics: packagedAnalyticsObject["cost"];
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function CostSummary({
  data,
  analytics,
  setModalHandler,
}: props) {
  return (
    <div className="py-2 flex flex-row h-5/6">
      {/* HEATING COLUMN */}
      <div className="w-1/3 flex flex-col">
        <div className="justify-center font-bold text-base md:text-lg pt-1 flex items-center gap-2">
          Heating <GiFireplace color="#eb6434" />
        </div>
        <div className="flex flex-col py-1 justify-between text-center h-full">
          <div className="py-2">
            <div className="text-sm md:text-base font-normal underline pb-1">
              Current Cost
            </div>
            <div>
              <b>£{data.heatingCostCurrent}</b>/year
            </div>
          </div>
          <div className="py-2">
            <div className="text-sm md:text-base font-normal underline pb-1">
              Potential Cost
            </div>
            <div>
              <b>£{data.heatingCostPotential}</b>/year
            </div>
          </div>

          <div className="border border-x-0 border-t-0"></div>
          <div className="py-2">
            <div className="text-sm md:text-base font-normal underline pb-1">
              Area Average
            </div>
            <div>
              <b>£{analytics?.meanCurrentHeatingCost}</b>/year
            </div>
          </div>
        </div>
      </div>
      <div className="border border-r-1 border-l-0 border-y-0"></div>
      {/* HOT WATER COLUMN */}
      <div className="w-1/3 flex flex-col">
        <div className="justify-center font-bold text-base md:text-lg pt-1 flex items-center gap-2">
          Hot Water <GiWaterDrop color="#34bdeb" />{" "}
        </div>

        <div className="flex flex-col py-1 justify-between text-center h-full">
          <div className="py-2">
            <div className="text-sm md:text-base font-normal underline pb-1">
              Current Cost
            </div>
            <div>
              <b>£{data.hotWaterCostCurrent}</b>/year
            </div>
          </div>
          <div className="py-2">
            <div className="text-sm md:text-base font-normal underline pb-1">
              Potential Cost
            </div>
            <div>
              <b>£{data.hotWaterCostPotential}</b>/year
            </div>
          </div>
          <div className="border border-x-0 border-t-0"></div>
          <div className="py-2">
            <div className="text-sm md:text-base font-normal underline pb-1">
              Area Average
            </div>
            <div>
              <b>£{analytics?.meanCurrentHotWaterCost}</b>/year
            </div>
          </div>
        </div>
      </div>
      <div className="border border-r-1 border-l-0 border-y-0"></div>
      {/* LIGHTING COLUMN */}
      <div className="w-1/3 flex flex-col h-full">
        <div className="justify-center font-bold text-base md:text-lg pt-1 flex items-center gap-2">
          Lighting <BsLightbulb color="#d4c328" />
        </div>

        <div className="flex flex-col py-1 justify-between text-center h-full">
          <div className="py-2">
            <div className="text-sm md:text-base font-normal underline pb-1">
              Current Cost
            </div>
            <div>
              <b>£{data.lightingCostCurrent}</b>/year
            </div>
          </div>
          <div className="py-2">
            <div className="text-sm md:text-base font-normal underline pb-1">
              Potential Cost
            </div>
            <div>
              <b>£{data.lightingCostPotential}</b>/year
            </div>
          </div>

          <div className="border border-x-0 border-t-0"></div>
          <div className="py-2">
            <div className="text-sm md:text-base font-normal underline pb-1">
              Area Average
            </div>
            <div>
              <b>£{analytics?.meanCurrentLightingCost}</b>/year
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
