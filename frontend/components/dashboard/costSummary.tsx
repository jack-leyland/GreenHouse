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
    <div className="py-2 h-full">
      <div className="flex h-3/4">
        <div className="w-1/3 h-full pl-1 flex flex-col gap-1">
          <div className="w-full justify-center text-sm font-bold text-lg pt-1 flex items-center gap-2">
            Heating <GiFireplace color="#eb6434" />{" "}
          </div>
          <div className="flex gap-2 flex-col h-full">
            <div className="h-2/3 flex flex-col gap-2 w-full py-1 border border-x-0 border-t-0">
              <div>
                Current Cost: <b> {data.heatingCostCurrent}</b> £/year
              </div>
              <div>
                Potential Cost: <b>{data.heatingCostPotential}</b> £/year
              </div>
              <div
                onClick={() => setModalHandler("costs")}
                className="pt-2 italic text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 hover:cursor-pointer"
              >
                What does this mean <AiOutlineArrowRight />{" "}
              </div>
            </div>
            <div className="h-1/3">
              <div className="py-1 underline">In Your Area</div>
              In your area, the average person pays{" "}
              <i>{analytics?.meanCurrentHeatingCost} £/year</i> on heating.
            </div>
          </div>
        </div>

        <div className="w-1/3 border border-y-0 h-full pl-2 flex flex-col gap-1">
          <div className="w-full justify-center text-sm font-bold text-lg pt-1 flex items-center gap-2">
            Hot Water <GiWaterDrop color="#34bdeb" />{" "}
          </div>

          <div className="flex gap-2 flex-col h-full">
            <div className="h-2/3 flex flex-col gap-2 w-full py-1 border border-x-0 border-t-0">
              <div>
                Current Cost: <b> {data.hotWaterCostCurrent}</b> £/year
              </div>
              <div>
                Potential Cost: <b>{data.hotWaterCostPotential}</b> £/year
              </div>
              <div
                onClick={() => setModalHandler("costs")}
                className="pt-2 italic text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 hover:cursor-pointer"
              >
                What does this mean <AiOutlineArrowRight />{" "}
              </div>
            </div>
            <div className="h-1/3">
              <div className="py-1 underline">In Your Area</div>
              In your area, the average person pays{" "}
              <i>{analytics?.meanCurrentHotWaterCost} £/year</i> on hot water.
            </div>
          </div>
        </div>

        <div className="w-1/3 h-full pl-1 flex flex-col gap-1">
          <div className="w-full justify-center text-sm font-bold pt-1 flex text-lg items-center gap-2">
            Lighting <BsLightbulb color="#d4c328" />{" "}
          </div>

          <div className="flex gap-2 flex-col h-full">
            <div className="h-2/3 flex flex-col gap-2 w-full py-1 border border-x-0 border-t-0">
              <div>
                Current Cost: <b> {data.lightingCostCurrent}</b> £/year
              </div>
              <div>
                Potential Cost: <b>{data.lightingCostPotential}</b> £/year
              </div>
              <div
                onClick={() => setModalHandler("costs")}
                className="pt-2 italic text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 hover:cursor-pointer"
              >
                What does this mean <AiOutlineArrowRight />{" "}
              </div>
            </div>
            <div className="h-1/3">
              <div className="py-1 underline">In Your Area</div>
              In your area, the average person pays{" "}
              <i>{analytics?.meanCurrentLightingCost} £/year</i> on lighting.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
