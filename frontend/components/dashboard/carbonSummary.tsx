import React, { Dispatch, SetStateAction } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";
import { epcCertificateObject, packagedAnalyticsObject } from "../../types";
import { AiOutlineArrowRight } from "react-icons/ai";

interface props {
  data: epcCertificateObject["House"]["environmental"];
  analytics: packagedAnalyticsObject["environmental"];
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function CarbonSummary({
  data,
  analytics,
  setModalHandler,
}: props) {
  const carbonData = [
    {
      name: "C02 Production",
      Current: data.co2EmissionsCurrent,
      Potential: data.co2EmissionsPotential,
    },
  ];

  return (
    <div className="py-2 px-1 h-[80%] overflow-y-scroll overflow-x-scroll">
      <div className="flex flex-row ">
        <div className="w-1/2 md:w-1/3 flex flex-col justify-between h-full">
          <div className="flex justify-center">
            <button
              onClick={() => setModalHandler("carbonProduction")}
              className="mr-2 pt-2 font-semibold md:text-base text-sm md:hover:no-underline hover:underline"
            >
              CO<sub>2</sub> Production
            </button>
            <div className="pt-3">
              {" "}
              <AiFillQuestionCircle
                size={16}
                className="hover:cursor-pointer"
                onClick={() => setModalHandler("carbonProduction")}
              />
            </div>
          </div>
          <div className="h-full flex justify-center items-center pt-6">
            <BarChart
              layout="horizontal"
              width={150}
              height={175}
              data={carbonData}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="Current" fill="#e9153b" />
              <Bar dataKey="Potential" fill="#19b45a" />
            </BarChart>
          </div>
        </div>
        <div className="border border-r-1 border-l-0 border-y-0"></div>
        <div className="w-1/2 md:w-2/3 px-4 ">
          <div className="">
            <div className="py-2 md:text-base text-sm">
              Your current CO<sub>2</sub> production is{" "}
              <b>{data.co2EmissionsCurrent}</b> tonnes per year.
            </div>
            <div className="py-2 md:text-base text-sm">
              Your potential CO<sub>2</sub> production is{" "}
              <b>{data.co2EmissionsPotential} </b> tonnes per year.
            </div>
          </div>
          <div className="border border-x-0 border-t-0"></div>
          <div className="py-1 md:text-lg text-sm font-semibold underline">
            How you compare
          </div>
          <div className="py-1 md:text-base text-sm">
            The average for CO<sub>2</sub> production for your area is{" "}
            <b>{analytics.meanCurrentCo2Consumption}</b> tonnes per year.
          </div>
        </div>
      </div>
    </div>
  );
}
