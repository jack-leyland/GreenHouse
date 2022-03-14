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
  let lightingSavings = data.lightingCostCurrent - data.lightingCostPotential;
  if (lightingSavings < 0) {
    lightingSavings = 0;
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
    <>
    <div className="w-full flex justify-center my-6">
    <div className="w-[95%] animate-fade">
      <div className="grid grid-cols-3 grid-rows-4 gap-1">
        <div className="col-start-1 col-end-4 row-start-1 row-end-1 text-center text-md title-font tracking-wide bg-gray-200 rounded-default p-1">
         Your potential savings by improvement category
        </div>
        <div className="col-start-1 col-end-3 row-start-2 row-end-2 text-sm tracking-widest title-font pb-1 mt-1 font-bold border-b border-black">
          <span className="bg-yellow-500 pr-5 mr-5"></span>
          Lighting
        </div>
        <div className="col-start-3 col-end-3 row-start-2 row-end-2 text-sm tracking-widest title-font pb-1 mt-1 border-b border-black">
          <p><span className={"" + (lightingSavings > 0 ? "text-primary font-bold" : "")}>£{lightingSavings}</span> per year</p>
        </div>

        <div className="col-start-1 col-end-3 row-start-3 row-end-3 text-sm tracking-widest title-font pb-1 mt-1 font-bold border-b border-black">
          <span className="bg-red-500 pr-5 mr-5"></span>
          Heating
        </div>
        <div className="col-start-3 col-end-3 row-start-3 row-end-3 text-sm tracking-widest title-font pb-1 mt-1 border-b border-black">
          <p><span className={"" + (heatingSavings > 0 ? "text-primary font-bold" : "")}>£{heatingSavings}</span> per year</p>
        </div>

        <div className="col-start-1 col-end-3 row-start-4 row-end-4 text-sm tracking-widest title-font pb-1 mt-1 font-bold border-b border-black">
          <span className="bg-blue-500 pr-5 mr-5"></span>
          Water
        </div>
        <div className="col-start-3 col-end-3 row-start-4 row-end-4 text-sm tracking-widest title-font pb-1 mt-1 border-b border-black">
          <p><span className={"" + (waterSavings > 0 ? "text-primary font-bold" : "")}>£{waterSavings}</span> per year</p>
        </div>
        {/* <div className="col-start-1 col-end-3 row-start-4 row-end-4 text-sm tracking-widest title-font mb-1 font-bold">
          <span className="bg-slate-500 pr-5 mr-5"></span>
          Other Improvements
        </div> */}
      </div>
    </div>
    </div>
    </>
  );
}
