import React from 'react';
import ReactTooltip from 'react-tooltip';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { epcCertificateObject,packagedAnalyticsObject } from '../../types';
import {AiOutlineArrowRight} from 'react-icons/ai';

interface props {
  data: epcCertificateObject['House']['environmental'];
  analytics: packagedAnalyticsObject['environmental'];
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
          <div>
            <div className="px-4 py-1">
              <div className="border border-x-0 border-t-0">
                <div className="py-1 text-sm">
                  Your current CO<sub>2</sub> production is <b>{data.co2EmissionsCurrent}</b> Kg per year. 
                </div>
                <div className="py-1 text-sm">
                  Your potential CO<sub>2</sub> production is <b>{data.co2EmissionsPotential}{" "}</b> Kg per year.
                </div>
                <div className="pt-2 pb-3 italic text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 hover:cursor-pointer">What does this mean <AiOutlineArrowRight/> </div>
              </div>
              <div className="pt-2 text-sm">
                <strong>How you compare:</strong>
              </div>
              <div className="py-1 text-sm">
                The average for CO<sub>2</sub> production for your area is <b>{analytics.meanCurrentCo2Consumption}</b> Kg per year.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
