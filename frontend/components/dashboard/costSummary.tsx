import React, {Dispatch, SetStateAction} from 'react';
import { GiWaterDrop, GiFireplace } from 'react-icons/gi';
import { BsLightbulb } from 'react-icons/bs';
import { epcCertificateObject, packagedAnalyticsObject } from '../../types';
import {AiOutlineArrowRight} from 'react-icons/ai';

interface props {
  data: epcCertificateObject['House']['costs'];
  analytics: packagedAnalyticsObject['cost'];
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function CostSummary({ data, analytics, setModalHandler }: props) {
  return (
    <div className="py-2 h-full">
      <div className="flex h-3/4">
        <div className="w-1/3 h-full pl-1 flex flex-col gap-1">
          <div className="w-full justify-center font-bold text-lg pt-1 flex items-center gap-2">
            Heating <GiFireplace color="#eb6434" />{' '}
          </div>

          <div className="flex gap-2 flex-col h-full">
            <div className="flex flex-col gap-2 w-full py-1 pb-3 border border-x-0 border-t-0 text-center">
              <div>
                Current Cost: <b>£{data.heatingCostCurrent}</b>/year
              </div>
              <div>
                Potential Cost: <b>£{data.heatingCostPotential}</b>/year
              </div>
            </div>
            <div className="text-center px-2">
              Area Average: <i className="font-bold">£{analytics?.meanCurrentHeatingCost}/year</i>
            </div>
          </div>

        </div>

        <div className="w-1/3 border border-y-0 h-full pl-2 flex flex-col gap-1">
          <div className="w-full justify-center font-bold text-lg pt-1 flex items-center gap-2">
            Hot Water <GiWaterDrop color="#34bdeb" />{' '}
          </div>

          <div className="flex gap-2 flex-col h-full">
            <div className="flex flex-col gap-2 w-full py-1 pb-3 border border-x-0 border-t-0 text-center">
              <div>
                Current Cost: <b>£{data.hotWaterCostCurrent}</b>/year
              </div>
              <div>
                Potential Cost: <b>£{data.hotWaterCostPotential}</b>/year
              </div>
            </div>
            <div className="text-center px-2">
              Area Average: <i className="font-bold">£{analytics?.meanCurrentHotWaterCost}/year</i>
            </div>
          </div>

        </div>
        
        <div className="w-1/3 h-full pl-1 flex flex-col gap-1">
          <div className="w-full justify-center font-bold pt-1 flex text-lg items-center gap-2">
            Lighting <BsLightbulb color="#d4c328" />{' '}
          </div>

          <div className="flex gap-2 flex-col h-full">
            <div className="flex flex-col gap-2 w-full py-1 pb-3 border border-x-0 border-t-0 text-center">
              <div>
                Current Cost: <b>£{data.lightingCostCurrent}</b>/year
              </div>
              <div>
                Potential Cost: <b>£{data.lightingCostPotential}</b>/year
              </div>
            </div>
            <div className="text-center px-2">
              Area Average:<i className="font-bold">£{analytics?.meanCurrentLightingCost}/year</i> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
