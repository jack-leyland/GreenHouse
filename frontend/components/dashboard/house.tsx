import React, {Dispatch, SetStateAction} from 'react';
import { useState } from 'react';
import Card from '../generic/card';
import { GiWindow, GiWaterDrop, GiFireplace } from 'react-icons/gi';
import { BsLightbulb } from 'react-icons/bs';
import FeatureCard from './featureCard';
import type { epcCertificateObject, packagedAnalyticsObject } from '../../types';

interface props {
  data: epcCertificateObject['House'];
  analytics: packagedAnalyticsObject['house'];
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function House({ data, analytics, setModalHandler}: props) {
  const [sidePanelType, setSidePanelType] = useState<string>('');

  return (
    <div className="flex flex-col w-full h-full px-6 py-4 gap-6 pb-6 relative">
      <div className="flex justify-center w-full ">
        <div className="grid grid-cols-6 grid-rows-7 gap-2 w-2/3 h-2/5">
          {/*Roof*/}
          <div
            className="house-card-roof col-start-1 col-end-7 row-start-0 row-end-0 roof animate-fade hover:scale-105 hover:cursor-pointer rounded-lg"
            onClick={() => {
              setSidePanelType("Roof");
            }}
          ></div>

          {/*Walls*/}
          <Card
            style={
              "col-start-1 col-end-2 row-start-2 row-end-7 bg-stone-200 wall"
            }
            onClick={() => {
              setSidePanelType("Walls");
            }}
            disableHoverAnimation={false}
            showShadow={true}
          ></Card>

          <Card
            style={
              "col-start-6 col-end-7 row-start-2 row-end-7 bg-stone-200 wall"
            }
            onClick={() => {
              setSidePanelType("Walls");
            }}
            disableHoverAnimation={false}
            showShadow={true}
          ></Card>

          {/*Floor*/}
          <div className={"col-start-2 col-end-6 row-start-6 flex items-end"}>
            <Card
              style={"bg-[#c3a590] rounded-none floor"}
              disableHoverAnimation={false}
              showShadow={true}
              onClick={() => {
                setSidePanelType("Floor");
              }}
            ></Card>
          </div>

          {/*Inner Cards*/}
          <Card
            style={"col-start-2 col-end-4 row-start-2 row-end-4 border"}
            disableHoverAnimation={false}
            showShadow={false}
            onClick={() => {
              setSidePanelType("Windows");
            }}
          >
            <div className="flex justify-center h-full items-center">
              <GiWindow size={25} />
            </div>
          </Card>

          <Card
            style={"col-start-4 col-end-6 row-start-2 row-end-4 border"}
            disableHoverAnimation={false}
            showShadow={false}
            onClick={() => {
              setSidePanelType("Water");
            }}
          >
            <div className="flex justify-center h-full items-center">
              <GiWaterDrop size={25} />
            </div>
          </Card>

          <Card
            style={"col-start-2 col-end-4 row-start-4 row-end-6 border"}
            disableHoverAnimation={false}
            showShadow={false}
            onClick={() => {
              setSidePanelType("Heating");
            }}
          >
            <div className="flex justify-center h-full items-center">
              <GiFireplace size={25} />
            </div>
          </Card>

          <Card
            style={"col-start-4 col-end-6 row-start-4 row-end-6 border"}
            disableHoverAnimation={false}
            showShadow={false}
            onClick={() => {
              setSidePanelType("Lighting");
            }}
          >
            <div className="flex justify-center h-full items-center">
              <BsLightbulb size={25} />
            </div>
          </Card>
        </div>
      </div>

      <div className="w-full h-3/5">
        <div className="w-full h-full">
          <FeatureCard data={data} type={sidePanelType} analytics={analytics} setModalHandler={setModalHandler}/>
        </div>
      </div>
    </div>
  );
}
