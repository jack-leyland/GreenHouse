import React, { useEffect, useState } from 'react';

interface props {
  title: string;
  data: any;
}

export default function PageTitle({ title, data }: props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Show more details');
  const [buttonStyle, setButtonStyle] = useState<string>(
    'text-md w-[20%] bg-emerald rounded-default overflow-hidden text-white h-full opacity-70 hover:opacity-100'
  );

  let addressElements = [
    data.address,
    data.localAuthorityName,
    data.posttown,
    data.postcode,
  ];
  let fullAddressString = addressElements.join(', ');

  function handleButtonClick() {
    if (expanded) {
      setExpanded(false);
      setButtonText('Show more details');
      setButtonStyle(
        'text-md w-[20%] bg-emerald rounded-default overflow-hidden text-white h-full opacity-70 hover:opacity-100'
      );
    } else {
      setExpanded(true);
      setButtonText('Collapse details');
      setButtonStyle(
        'text-md w-[20%] bg-red-400 rounded-default overflow-hidden text-white h-full opacity-70 hover:opacity-100'
      );
    }
  }

  return (
    <>
      <div className="mt-9 ml-9 pb-2 mr-9 border-b-2 border-neutral-300">
        <h1 className="text-2xl pb-2 font-semibold text-zinc-800">{title}</h1>
        <div className="w-full flex items-center h-[30px]">
          <h3 className="text-md w-1/2">{fullAddressString}</h3>
          <h3 className="text-md w-[30%] text-center">
            Inspection Date: {data.inspectionDate}
          </h3>
          <button className={buttonStyle} onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>
        {expanded ? <ExpandedDisplay data={data} /> : null}
      </div>
    </>
  );
}

type renderConditionObject = {
  energyTariff: boolean;
  flatStoreyCount: boolean;
  floorLevel: boolean;
  flatTopStorey: boolean;
};

function ExpandedDisplay(props: any) {
  const [renderConditions, setRenderConditions] =
    useState<renderConditionObject>();

  useEffect(() => {
    if (!props) return;
    let tempRenderConditions: renderConditionObject = {
      energyTariff: false,
      flatStoreyCount: false,
      floorLevel: false,
      flatTopStorey: false,
    };
    if (props.data.flatStoreyCount) tempRenderConditions.flatStoreyCount = true;
    if (
      props.data.energyTariff &&
      props.data.energyTariff.toLowerCase() != 'unknown'
    )
      tempRenderConditions.energyTariff = true;
    if (
      props.data.floorLevel &&
      parseInt(props.data.floorLevel) != NaN &&
      parseInt(props.data.floorLevel) > 0
    ) {
      tempRenderConditions.floorLevel = true;
    }
    if (
      props.data.flatTopStorey &&
      (props.data.flatTopStorey.toLowerCase() == 'n' ||
        props.data.flatTopStorey.toLowerCase() == 'y')
    ) {
      tempRenderConditions.flatTopStorey = true;
    }
    setRenderConditions(tempRenderConditions);
  }, [props]);

  let divBaseStyle = 'mr-[8px] inline-block';
  let spanDarkLabel = 'text-zinc-800 font-bold';

  return (
    <div className="w-full flex-wrap mt-[5px]">
      <div className={divBaseStyle}>
        {' '}
        <span className={spanDarkLabel}>Property Type: </span>
        {props.data.propertyType}
      </div>
      <div className={divBaseStyle}>
        <span className={spanDarkLabel}>Total Floor Area: </span>
        {props.data.totalFloorArea}m<sup>2</sup>
      </div>
      <div className={divBaseStyle}>
        <span className={spanDarkLabel}>Built From: </span>
        {props.data.builtForm}
      </div>
      <div className={divBaseStyle}>
        <span className={spanDarkLabel}>Construction Age Band: </span>
        {props.data.constructionAgeBand}
      </div>
      <div className={divBaseStyle}>
        <span className={spanDarkLabel}>Energy Tariff:</span>{' '}
        {renderConditions?.energyTariff
          ? props.data.energyTariff
          : 'Not available'}
      </div>
      {renderConditions?.flatStoreyCount ? (
        <div className={divBaseStyle}>
          <span className={spanDarkLabel}>Flat Storey Count: </span>
          {props.data.flatStoreyCount}
        </div>
      ) : null}
      {renderConditions?.flatTopStorey ? (
        <div className={divBaseStyle}>
          <span className={spanDarkLabel}>Flat is Top Storey: </span>
          {props.data.flatTopStorey.toLowerCase() == 'n' ? 'No' : 'Yes'}{' '}
        </div>
      ) : null}
      {renderConditions?.floorLevel ? (
        <div className={divBaseStyle}>
          <span className={spanDarkLabel}>Floor Level: </span>
          {parseInt(props.data.floorLevel)}{' '}
        </div>
      ) : null}
    </div>
  );
}
