import React from 'react';
import { useState } from 'react';
import Card from './card';
import { GiWindow, GiWaterDrop, GiFireplace } from 'react-icons/gi';
import { BsLightbulb } from 'react-icons/bs';
import FeatureCard from './featureCard';
import type { epcCertificateObject} from '../types';


interface props {
  data: epcCertificateObject;
}

export default function House({data}: props) {
  const [sidePanelType, setSidePanelType] = useState<string>('');

  return (
    <div className="flex flex-col w-full h-full px-6 gap-6 pb-6 relative">  


      <div className="flex justify-center">
        <div className="grid grid-cols-6 grid-rows-7 w-full gap-2 w-2/3">
          {/*Roof*/}
          <div className="house-card-roof col-start-1 col-end-7 row-start-0 row-end-0 roof animate-fade hover:scale-105 hover:cursor-pointer rounded-lg"
              onClick={() => {
                setSidePanelType('Roof');
              }}
          > 
          </div>

          {/*Walls*/}
          <Card
            style={'col-start-1 col-end-2 row-start-2 row-end-7 bg-stone-200 wall'}
            onClick={() => {
              setSidePanelType('Walls');
            }}
            disableHoverAnimation={false}
            showShadow={true}
          ></Card>

          <Card
            style={'col-start-6 col-end-7 row-start-2 row-end-7 bg-stone-200 wall'}
            onClick={() => {
              setSidePanelType('Walls');
            }}
            disableHoverAnimation={false}
            showShadow={true}
          ></Card>

          {/*Floor*/}
          <div className={'col-start-2 col-end-6 row-start-6 flex items-end'}>
            <Card
              style={'bg-[#c3a590] rounded-none floor'}
              disableHoverAnimation={false}
              showShadow={true}
              onClick={() => {
                setSidePanelType('Floor');
              }}
            ></Card>
          </div>

          {/*Inner Cards*/}
          <Card
            style={'col-start-2 col-end-4 row-start-2 row-end-4'}
            disableHoverAnimation={false}
            showShadow={true}
            onClick={() => {
              setSidePanelType('Windows')
            }}
          >
            <div className="flex justify-center h-full items-center">
              <GiWindow size={25} />
            </div>
          </Card>

          <Card
            style={'col-start-4 col-end-6 row-start-2 row-end-4'}
            disableHoverAnimation={false}
            showShadow={true}
            onClick={() => {
              setSidePanelType('Water')
            }}
          >
            <div className="flex justify-center h-full items-center">
              <GiWaterDrop size={25} />
            </div>
          </Card>

          <Card
            style={'col-start-2 col-end-4 row-start-4 row-end-6'}
            disableHoverAnimation={false}
            showShadow={true}
            onClick={() => {
              setSidePanelType('Heating')
            }}
          >
            <div className="flex justify-center h-full items-center">
              <GiFireplace size={25} />
            </div>
          </Card>

          <Card
            style={'col-start-4 col-end-6 row-start-4 row-end-6'}
            disableHoverAnimation={false}
            showShadow={true}
            onClick={() => {
              setSidePanelType('Lighting')
            }}
          >
            <div className="flex justify-center h-full items-center">
              <BsLightbulb size={25} />
            </div>
          </Card>
        </div>
      </div>
      
      <div className="w-full h-full relative">
        <div className="w-full h-full absolute">
          <FeatureCard
            data={data}
            type={sidePanelType}
          />
        </div>
      </div>      
    </div>
  );
}
