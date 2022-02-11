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
  //These states will be cleaned in refactor, just a quick fix
  const [sidePanelType, setSidePanelType] = useState<string>('');

  return (
    <div className="flex w-full h-full p-6 gap-6 pr-12 pb-12 absolute">      
      <div className="grid grid-cols-6 grid-rows-7 w-full gap-2">
        {/*Roof*/}
        <div className="house-card-roof col-start-1 col-end-7 row-start-0 row-end-0 roof animate-fade hover:scale-105 hover:cursor-pointer rounded-lg"
            onClick={() => {
              setSidePanelType('Roof');
            }}
        > 
        </div>

        {/*Walls*/}
        <Card
          style={'col-start-1 col-end-2 row-start-2 row-end-7 bg-stone-200'}
          onClick={() => {
            setSidePanelType('Walls');
          }}
          disableHoverAnimation={false}
          showShadow={true}
        ></Card>

        <Card
          style={'col-start-6 col-end-7 row-start-2 row-end-7 bg-stone-200'}
          onClick={() => {
            setSidePanelType('Walls');
          }}
          disableHoverAnimation={false}
          showShadow={true}
        ></Card>

        {/*Floor*/}
        <div className={'col-start-2 col-end-6 row-start-6 flex items-end'}>
          <Card
            style={'bg-[#c3a590]'}
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
          <div className="h-0 flex justify-center">
            <GiWindow size={20} />
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
          <div className="h-0 flex justify-center">
            <GiWaterDrop size={20} />
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
          <div className="h-0 flex justify-center">
            <GiFireplace size={20} />
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
          <div className="h-0 flex justify-center">
            <BsLightbulb size={20} />
          </div>
        </Card>
      </div>
      
      <div className="w-1/2">
        {sidePanelType ? (
            <FeatureCard
              data={data}
              type={sidePanelType}
            />
        ) : (
          <Card
            style={'overflow-scroll'}
            disableHoverAnimation={true}
            showShadow={true}
          >
            <div>Hover one of the house features to find out more...</div>
          </Card>
        )
        }
      </div>
    </div>
  );
}
