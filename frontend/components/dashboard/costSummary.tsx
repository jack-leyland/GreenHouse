import React from "react";
import { GiWaterDrop, GiFireplace } from "react-icons/gi";
import { BsLightbulb } from "react-icons/bs";
import { epcCertificateObject, packagedAnalyticsObject } from "../../types";

interface props {
  data: epcCertificateObject["House"]["costs"];
  analytics: packagedAnalyticsObject["cost"];
}

export default function CostSummary({ data, analytics }: props) {
  return (
    <div className="py-2 px-1 h-full">
      <div className="flex h-3/4">
        <div className="w-1/3 h-full px-1 flex flex-col gap-2">
          <div className="w-full justify-center text-sm font-bold text-lg p-2 flex items-center gap-2">
            Heating <GiFireplace color="#eb6434" />{" "}
          </div>
          <div className="flex gap-2 flex-col h-full">
            <div className="h-2/3 flex flex-col gap-2 w-full py-1 border border-x-0 border-t-0">
              <div>
                <b>Current Cost:</b> {data.heatingCostCurrent} £/year
              </div>
              <div>
                In your area, the average person pays{" "}
                <i>{analytics?.meanCurrentHeatingCost} £/year</i> on heating.
              </div>
            </div>

            <div className="h-1/3">
              <b>Potential Cost:</b> {data.heatingCostPotential} £/year
            </div>
          </div>
        </div>
        <div className="w-1/3 border border-y-0 h-full px-2 flex flex-col gap-2">
          <div className="w-full justify-center text-sm font-bold p-2 flex text-lg items-center gap-2">
            Hot Water <GiWaterDrop color="#34bdeb" />{" "}
          </div>
          <div className="flex gap-2 flex-col h-full">
            <div className="h-2/3 flex flex-col gap-2 w-full py-1 border border-x-0 border-t-0">
              <div>
                <b>Current Cost:</b> {data.hotWaterCostCurrent} £/year
              </div>
              <div>
                In your area, the average person pays{" "}
                <i>{analytics?.meanCurrentHotWaterCost} £/year</i> on hot water.
              </div>
            </div>
            <div className="h-1/3">
              <b>Potential Cost:</b> {data.hotWaterCostPotential} £/year
            </div>
          </div>
        </div>
        <div className="w-1/3 h-full px-2 flex flex-col gap-2">
          <div className="w-full justify-center text-sm font-bold p-2 flex text-lg items-center gap-2">
            Lighting <BsLightbulb color="#d4c328" />{" "}
          </div>
          <div className="flex gap-2 flex-col h-full">
            <div className="h-2/3 flex flex-col gap-2 w-full py-1 border border-x-0 border-t-0">
              <div>
                <b>Current Cost:</b> {data.lightingCostCurrent} £/year
              </div>
              <div>
                In your area, the average person pays{" "}
                <i>{analytics?.meanCurrentLightingCost} £/year</i> on lighting.
              </div>
            </div>
            <div className="h-1/3">
              <b>Potential Cost:</b> {data.lightingCostPotential} £/year
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
