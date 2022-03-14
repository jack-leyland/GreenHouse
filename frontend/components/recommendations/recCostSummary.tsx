import React from "react";

interface props {
  data: {
    address: string;
    heatingCostCurrent: number;
    heatingCostPotential: number;
    hotWaterCostCurrent: number;
    hotWaterCostPotential: number;
    lightingCostCurrent: number;
    lightingCostPotential: number;
    postcode: string;
    posttown: string;
  };
}

export default function RecCostSummary({ data }: props) {
  let lightingsavings = data.lightingCostCurrent - data.lightingCostPotential;
  if (lightingsavings < 0) {
    lightingsavings = 0;
  }

  let heatingSavings = data.heatingCostCurrent - data.heatingCostPotential;
  if (heatingSavings < 0) {
    heatingSavings = 0;
  }

  let waterSavings = data.hotWaterCostCurrent - data.hotWaterCostPotential;
  if (waterSavings < 0) {
    waterSavings = 0;
  }

  return (
    <div className="w-full ml-9 mt-6 mb-6 animate-fade">
      <div className="sm:grid grid-cols-4 grid-rows-4 gap-1">
        <div className="col-start-1 col-end-3 row-start-1 row-end-1 text-sm tracking-widest title-font mb-1 font-bold">
          <span className="bg-yellow-500 pr-5 mr-5"></span>
          Total Savings from Lighting Improvements
        </div>
        <div className="col-start-3 col-end-3 row-start-1 row-end-1 text-sm tracking-widest title-font mb-1 font-bold">
          <p>£{lightingsavings} per year</p>
        </div>

        <div className="col-start-1 col-end-3 row-start-2 row-end-2 text-sm tracking-widest title-font mb-1 font-bold">
          <span className="bg-red-500 pr-5 mr-5"></span>
          Total Savings from Heating Improvements
        </div>
        <div className="col-start-3 col-end-3 row-start-2 row-end-2 text-sm tracking-widest title-font mb-1 font-bold">
          <p>£{heatingSavings} per year</p>
        </div>

        <div className="col-start-1 col-end-3 row-start-3 row-end-3 text-sm tracking-widest title-font mb-1 font-bold">
          <span className="bg-blue-500 pr-5 mr-5"></span>
          Total Savings from Water Improvements
        </div>
        <div className="col-start-3 col-end-3 row-start-3 row-end-3 text-sm tracking-widest title-font mb-1 font-bold">
          <p>£{waterSavings} per year</p>
        </div>
        <div className="col-start-1 col-end-3 row-start-4 row-end-4 text-sm tracking-widest title-font mb-1 font-bold">
          <span className="bg-slate-500 pr-5 mr-5"></span>
          Other Improvements
        </div>
      </div>
    </div>
  );
}
