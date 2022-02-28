import React from "react";
import ReactTooltip from "react-tooltip";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";
import { epcCertificateObject, packagedAnalyticsObject } from "../../types";

interface props {
  data: epcCertificateObject["House"]["environmental"];
  analytics: packagedAnalyticsObject["environmental"];
}

export default function CarbonSummary({ data, analytics }: props) {
  const carbonData = [
    {
      name: "C02 Production",
      Current: data.co2EmissionsCurrent,
      Potential: data.co2EmissionsPotential,
    },
  ];

  return (
    <div className="py-2 px-1 min-h-full">
      <div className="flex min-h-3/4">
        <div className="min-w-5/12">
          <div className="flex items-center mx-1">
            <span className="mr-2">
              CO<sub>2</sub> Production
            </span>
            <ReactTooltip effect="solid" />
            <a data-tip="The amount of carbon dioxide produced by your house in kg/year">
              <AiFillQuestionCircle size={10} />
            </a>
          </div>
          <div className="h-full flex justify-center items-center pt-2">
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

        <div className="w-full border border-r-0 border-y-0">
          <div className="pb-1 text-sm px-4 ">
            <strong>How you compare:</strong>
          </div>
          <div>
            <div className="px-4 py-1">
              <div className="py-1">
                Your current CO<sub>2</sub> production is{" "}
                {data.co2EmissionsCurrent} Kg per year.
              </div>
              <div className="py-1">
                The average for your area is{" "}
                {analytics.meanCurrentCo2Consumption} Kg per year.
              </div>
              <div className="pt-3">
                After implementing improvements you could reduce your emssions
                to {data.co2EmissionsPotential} Kg per year.
              </div>
              <div className="py-2">
                This C0<sub>2</sub> reduction is equivalent to ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
