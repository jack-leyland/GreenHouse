import React from 'react';
import { useState } from 'react';
import Card from './card';
import { GiWindow, GiWaterDrop, GiFireplace } from 'react-icons/gi';
import { BsLightbulb } from 'react-icons/bs';

export default function House() {
  const [shown, setShown] = useState(false);
  const [sidePanelInfo, setSidePanelInfo] = useState<string>();

  return (
    <div className="grid grid-cols-9 grid-rows-7 w-full h-full p-6 gap-6 pr-12">
      {/*Roof*/}
      <div className="house-card-roof col-start-1 col-end-7 row-start-0 row-end-0 roof animate-fade hover:scale-105 hover:cursor-pointer rounded-lg"></div>

      {/*Walls*/}
      <Card
        style={'col-start-1 col-end-2 row-start-2 row-end-7 bg-stone-200'}
        onHover={() => {
          setShown(true);
          setSidePanelInfo('Walls');
        }}
        disableHoverAnimation={false}
        showShadow={true}
      ></Card>

      <Card
        style={'col-start-6 col-end-7 row-start-2 row-end-7 bg-stone-200'}
        onHover={setShown}
        disableHoverAnimation={false}
        showShadow={true}
      ></Card>

      {/*Floor*/}
      <div className={'col-start-2 col-end-6 row-start-6 flex items-end'}>
        <Card
          style={'bg-[#c3a590]'}
          disableHoverAnimation={false}
          showShadow={true}
        ></Card>
      </div>

      {/*Inner Cards*/}
      <Card
        style={'col-start-2 col-end-4 row-start-2 row-end-4'}
        disableHoverAnimation={false}
        showShadow={true}
      >
        <div className="h-0 flex justify-center">
          <GiWindow size={40} />
        </div>
      </Card>

      <Card
        style={'col-start-4 col-end-6 row-start-2 row-end-4'}
        disableHoverAnimation={false}
        showShadow={true}
      >
        <div className="h-0 flex justify-center">
          <GiWaterDrop size={40} />
        </div>
      </Card>

      <Card
        style={'col-start-2 col-end-4 row-start-4 row-end-6'}
        disableHoverAnimation={false}
        showShadow={true}
      >
        <div className="h-0 flex justify-center">
          <GiFireplace size={40} />
        </div>
      </Card>

      <Card
        style={'col-start-4 col-end-6 row-start-4 row-end-6'}
        disableHoverAnimation={false}
        showShadow={true}
      >
        <div className="h-0 flex justify-center">
          <BsLightbulb size={40} />
        </div>
      </Card>
      {shown ? (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-7'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>{sidePanelInfo}</div>
        </Card>
      ) : (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-2'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>Hover one of the house features to find out more...</div>
        </Card>
      )}
    </div>
  );
}
