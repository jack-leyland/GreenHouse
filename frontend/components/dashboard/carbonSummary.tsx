import React from 'react';
import ReactTooltip from 'react-tooltip';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { epcCertificateObject } from '../../types';

interface props {
  data: epcCertificateObject['House']['environmental'];
}

export default function CarbonSummary({ data }: props) {
  const carbonData = [
    {
      name: 'C02 Production',
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
          <div className="h-full flex justify-center items-center pt-8">
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

        <div className="w-7/12 border border-r-0 border-y-0">
          <div className="pb-1 text-sm px-4 ">
            <strong>How you compare:</strong>
          </div>
          <div>
            <div className="px-4 py-1">
              <div className="py-1">
                You are in the bottom/top % of emitters in your area, and emit
                ... less/more than the average U.K. household
              </div>
              <div className="py-1">
                After implementing improvements you could reduce your emssions
                to {data.co2EmissionsPotential}{' '}
              </div>
              <div className="py-1">
                This C0<sub>2</sub> reduction is equivalent to ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
