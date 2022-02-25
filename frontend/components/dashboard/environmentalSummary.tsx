import React from "react";
import ReactTooltip from "react-tooltip";
import { AiFillQuestionCircle } from "react-icons/ai";
import { GiAirplaneDeparture } from "react-icons/gi";
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
}

export default function EnvironmentalSummary({ data }: props) {
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

  return (
    <div className="py-2 px-1 min-h-full">
      <div className="flex h-3/4">
        <div className="min-w-7/12">
          <div className="min-h-full flex flex-col pt-1 px-1">
            <div className="pb-2">
              Energy Consumption Current: {data.energyConsumptionCurrent}{" "}
              kWh/year
            </div>
            <div className="pb-2">
              Energy Consumption Potential: {data.energyConsumptionPotential}{" "}
              kWh/year
            </div>
            <div className="pt-1">
              You can potentially reduce your energy consumption by{" "}
              {data.energyConsumptionCurrent - data.energyConsumptionPotential}{" "}
              kWh/year. This is equivalent to:
            </div>
            <div className="flex w-full justify-center gap-2 py-3">
              <div className="flex flex-col justify-center items-center w-1/3">
                <GiAirplaneDeparture color={"#78abc4"} size={35} />
                <p>? plane journeys</p>
              </div>
              <div className="flex flex-col justify-center items-center w-1/3">
                <AiFillCar color={"#963041"} size={35} />
                <p>? car journeys</p>
              </div>
              <div className="flex flex-col justify-center items-center w-1/3">
                <GiOilPump color={"black"} size={35} />
                <p>? barrels of oil</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-5/12 border border-r-0 border-y-0">
          <div className="flex items-center mx-2">
            <span className="mr-2">Feature Environmental Efficiency</span>
            <ReactTooltip effect="solid" />
            <a data-tip="Each component of your house is given an environmental efficiency rating out of 5">
              <AiFillQuestionCircle size={10} />
            </a>
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
