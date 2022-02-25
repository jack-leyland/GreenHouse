import React from 'react';
import { GiWaterDrop, GiFireplace } from 'react-icons/gi';
import { BsLightbulb } from 'react-icons/bs';

interface props {
    heatingCurrent: number;
    heatingPotential: number;
    waterCurrent: number;
    waterPotential: number;
    lightingCurrent: number;
    lightingPotential: number;
}

export default function CostSummary({
        heatingCurrent,
        heatingPotential,
        waterCurrent,
        waterPotential,
        lightingCurrent,
        lightingPotential
    }: props) {

  return (
    <div className="py-2 px-1 h-full">
        <div className="flex h-3/4">
        <div className="w-1/3 h-full px-1 flex flex-col gap-2">
            <div className="w-full justify-center text-sm font-bold pb-1 flex items-center gap-2">Heating <GiFireplace color='#eb6434'/> </div>
            <div><b>Current Cost:</b> {heatingCurrent} £/year</div>
            <div>This is ? more/less than people in your area are paying</div>
            <div className="w-full border border-x-0 border-t-0"></div>
            <div><b>Potential Cost:</b> {heatingPotential} £/year</div>
            <div>This is ? more/less than people in your area are paying</div>
        </div>
        <div className="w-1/3 border border-y-0 h-full px-2 flex flex-col gap-2">
            <div className="w-full justify-center text-sm font-bold pb-1 flex items-center gap-2">Hot Water <GiWaterDrop color='#34bdeb'/> </div>
            <div><b>Current Cost:</b> {waterCurrent} £/year</div>
            <div>This is ? more/less than people in your area are paying</div>
            <div className="w-full border border-x-0 border-t-0"></div>
            <div><b>Potential Cost:</b> {waterPotential} £/year</div>
            <div>This is ? more/less than people in your area are paying</div>
        </div>
        <div className="w-1/3 h-full px-2 flex flex-col gap-2">
            <div className="w-full justify-center text-sm font-bold pb-1 flex items-center gap-2">Lighting <BsLightbulb color='#d4c328'/> </div>
            <div><b>Current Cost:</b> {lightingCurrent} £/year</div>
            <div>This is ? more/less than people in your area are paying</div>
            <div className="w-full border border-x-0 border-t-0"></div>
            <div><b>Potential Cost:</b> {lightingPotential} £/year</div>
            <div>This is ? more/less than people in your area are paying</div>
        </div>
        </div>
    </div>
  );
}
