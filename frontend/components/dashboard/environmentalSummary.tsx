import React, {Dispatch, SetStateAction} from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { MdOutlineSmartphone } from "react-icons/md";
import { GiOilPump } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import {
  Legend,
  RadarChart,
  Radar,
  PolarRadiusAxis,
  PolarAngleAxis,
  PolarGrid,
} from "recharts";
import { epcCertificateObject } from "../../types";

interface props {
  data: epcCertificateObject["House"]["consumptionEnvEff"];
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function EnvironmentalSummary({ data, setModalHandler }: props) {
  const featureData = [
    {
      feature: "Floor",
      rank: data.floorEnvEff,
      total: 5,
    },
    {
      feature: "Walls",
      rank: data.wallsEnvEff,
      total: 5,
    },
    {
      feature: "Roof",
      rank: data.roofEnvEff,
      total: 5,
    },
    {
      feature: "Lighting",
      rank: data.lightingEnvEff,
      total: 5,
    },
    {
      feature: "Heating",
      rank: data.mainHeatEnvEff,
      total: 5,
    },
    {
      feature: "Windows",
      rank: data.windowsEnvEff,
      total: 5,
    },
    {
      feature: "Water",
      rank: data.hotWaterEnvEff,
      total: 5,
    },
  ];

  const internationalNumberFormat = new Intl.NumberFormat('en-US')
  const barrelsOfOil = Math.round(data.energyConsumptionCurrent * 0.001645)
  const carJourneys = Math.round(data.energyConsumptionCurrent * 1.78)
  const phoneCharges = Math.round(data.energyConsumptionCurrent * 86.2)

  return (
    <div className="py-2 px-1 min-h-full">
      <div className="flex h-3/4">
        <div className="min-w-7/12">
          <div className="min-h-full flex flex-col pt-1 px-1">
            <div className="border border-x-0 border-t-0">
              <div className="pb-2 text-sm">
                Energy Consumption Current: <b>{data.energyConsumptionCurrent}</b>{" "}
                kWh/year
              </div>
              <div className="pb-2 text-sm">
                Energy Consumption Potential: <b>{data.energyConsumptionPotential}</b>{" "}
                kWh/year
              </div>
            </div>
            <div className="pt-3">
                You can potentially reduce your energy consumption by{" "}
                <b>{data.energyConsumptionCurrent - data.energyConsumptionPotential}{" "}</b>
                kWh/year. This is equivalent to:
              </div>
            <div className="flex w-full justify-center gap-2 py-5">
              <div className="flex flex-col justify-center items-center w-1/3">
                <MdOutlineSmartphone color={"#78abc4"} size={35} />
                <p className="text-center italic">{internationalNumberFormat.format(phoneCharges)} smartphone {phoneCharges > 1 ? "charges" : "charge"} charges</p>
              </div>
              <div className="flex flex-col justify-center items-center w-1/3">
                <AiFillCar color={"#963041"} size={35} />
                <p className="text-center italic">{internationalNumberFormat.format(carJourneys)} car {carJourneys > 1 ? "journeys" : "journey"} journeys</p>
              </div>
              <div className="flex flex-col justify-center items-center w-1/3">
                <GiOilPump color={"black"} size={35} />
                <p className="text-center italic">{internationalNumberFormat.format(barrelsOfOil)} {barrelsOfOil > 1 ? "barrels" : "barrel"} of oil</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-5/12 border border-r-0 border-y-0">
          <div className="flex items-center mx-2">
            <span className="mr-2">Feature Environmental Efficiency</span>
              <AiFillQuestionCircle className="hover:cursor-pointer" onClick={()=>setModalHandler("featureEfficiency")} size={13} />
          </div>
          <div className="flex justify-center align-center">
            <RadarChart
              outerRadius={40}
              width={200}
              height={150}
              data={featureData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="feature" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar
                name="Environmental Efficiency"
                dataKey="rank"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </div>
        </div>
      </div>
    </div>
  );
}
