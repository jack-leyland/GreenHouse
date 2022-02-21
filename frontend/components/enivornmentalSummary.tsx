import React from "react";
import Card from "../components/card";

type props = {
  environmentalData: {
    environmentImpactPotential: number;
    environmentImpactCurrent: number;
    energyConsumptionPotential: number;
    energyConsumptionCurrent: number;
  };
};

export default function EnvironmentalSummary({ environmentalData }: props) {
  return (
    <div className="grid grid-cols-12 grid-rows-1 w-full h-1/10 p-6 gap-6 pr-12">
      <Card
        style={"col-start-1 col-end-4 row-start-1"}
        disableHoverAnimation={false}
        showShadow={true}
      >
        <div>
          <h3>Current Environmental Impact</h3>
          <div className="p-2 font-bold text-3xl ">
            {environmentalData.environmentImpactCurrent}
          </div>
        </div>
      </Card>
      <Card
        style={"col-start-4 col-end-7 row-start-1"}
        disableHoverAnimation={false}
        showShadow={true}
      >
        <div>
          <h3>Potential Environmental Impact</h3>
          <div className="p-2 font-bold text-3xl ">
            {environmentalData.environmentImpactPotential}
          </div>
        </div>
      </Card>
      <Card
        style={"col-start-7 col-end-10 row-start-1"}
        disableHoverAnimation={false}
        showShadow={true}
      >
        <div>
          <h3>Current Energy Consumption</h3>
          <div className="p-2 font-bold text-3xl ">
            {environmentalData.energyConsumptionCurrent}
          </div>
        </div>
      </Card>
      <Card
        style={"col-start-10 col-end-13 row-start-1"}
        disableHoverAnimation={false}
        showShadow={true}
      >
        <div>
          <h3>Potential Energy Consumption</h3>
          <div className="p-2 font-bold text-3xl ">
            {environmentalData.energyConsumptionPotential}
          </div>
        </div>
      </Card>
    </div>
  );
}
