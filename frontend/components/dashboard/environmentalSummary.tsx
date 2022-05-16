import React, { Dispatch, SetStateAction } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { MdOutlineSmartphone } from 'react-icons/md';
import { GiCoalWagon } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';
import {
  Legend,
  RadarChart,
  Radar,
  PolarRadiusAxis,
  PolarAngleAxis,
  PolarGrid,
} from 'recharts';
import { epcCertificateObject } from '../../types';

interface props {
  data: epcCertificateObject['House']['consumptionEnvEff'];
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function EnvironmentalSummary({ data, setModalHandler }: props) {
  const featureData = [
    {
      feature: 'Windows',
      rank: data.windowsEnvEff ? data.windowsEnvEff : 0,
      total: 5,
    },
    {
      feature: 'Walls',
      rank: data.wallsEnvEff ? data.wallsEnvEff : 0,
      total: 5,
    },
    {
      feature: 'Roof',
      rank: data.roofEnvEff ? data.roofEnvEff : 0,
      total: 5,
    },
    {
      feature: 'Lighting',
      rank: data.lightingEnvEff ? data.lightingEnvEff : 0,
      total: 5,
    },
    {
      feature: 'Heating',
      rank: data.mainHeatEnvEff ? data.mainHeatEnvEff : 0,
      total: 5,
    },
    {
      feature: 'Floor',
      rank: data.floorEnvEff ? data.floorEnvEff : 0,
      total: 5,
    },
    {
      feature: 'Water',
      rank: data.hotWaterEnvEff ? data.hotWaterEnvEff : 0,
      total: 5,
    },
  ];

  const internationalNumberFormat = new Intl.NumberFormat('en-US');
  const kgsOfCoal = Math.round(
    (data.energyConsumptionCurrent - data.energyConsumptionPotential) /
      1.278 /
      2.204
  );
  const carJourneys = Math.round(
    (data.energyConsumptionCurrent - data.energyConsumptionPotential) * 1.78
  );
  const phoneCharges = Math.round(
    (data.energyConsumptionCurrent - data.energyConsumptionPotential) * 86.2
  );

  return (
    <div className="py-2 px-1 flex h-full overflow-x-scroll">
      <div className="h-full flex flex-col pt-1 px-1">
        <div className="">
          <div className="pb-2 text-sm md:text-base">
            Energy Consumption Current: <b>{data.energyConsumptionCurrent}</b>{' '}
            kWh/year
          </div>
          <div className="pb-2 text-sm md:text-base">
            Energy Consumption Potential:{' '}
            <b>{data.energyConsumptionPotential}</b> kWh/year
          </div>
        </div>
        <div className="border border-x-0 border-t-0"></div>

        <div className="py-2 text-xs md:text-base">
          You can potentially reduce your energy consumption by{' '}
          <b>
            {data.energyConsumptionCurrent - data.energyConsumptionPotential}{' '}
          </b>
          kWh/year.
        </div>
        <div className="py-2 text-xs md:text-base">This is equivalent to:</div>
        <div className="flex w-full justify-center gap-2 py-2">
          <div className="flex flex-col justify-center items-center w-1/3">
            <MdOutlineSmartphone color={'#78abc4'} size={35} />
            <p className="text-center md:text-sm text-xs italic">
              {internationalNumberFormat.format(phoneCharges)} smartphone{' '}
              {phoneCharges > 1 ? 'charges' : 'charge'}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-1/3">
            <AiFillCar color={'#963041'} size={35} />
            <p className="text-center md:text-sm text-xs italic">
              {internationalNumberFormat.format(carJourneys)} car{' '}
              {carJourneys > 1 ? 'journeys' : 'journey'}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-1/3">
            <GiCoalWagon color={'black'} size={35} />
            <p className="text-center md:text-sm text-xs italic">
              {internationalNumberFormat.format(kgsOfCoal)}{' '}
              {kgsOfCoal > 1 ? 'kgs' : 'kg'} of coal
            </p>
          </div>
        </div>
      </div>
      <div className="border border-r-1 border-l-0 border-y-0 h-4/5"></div>

      <div className="mx-2">
        <div className="flex justify-center">
          <button
            onClick={() => setModalHandler('carbonProduction')}
            className="mr-2 pt-2 font-semibold md:text-base text-sm md:hover:no-underline hover:underline"
          >
            Environmental Efficiency
          </button>
          <div className="pt-5">
            <AiFillQuestionCircle
              size={16}
              className="hover:cursor-pointer"
              onClick={() => setModalHandler('featureEfficiency')}
            />
          </div>
        </div>
        <div className="flex justify-center align-center">
          <RadarChart
            outerRadius={30}
            width={150}
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
          </RadarChart>
        </div>
      </div>
    </div>
  );
}
