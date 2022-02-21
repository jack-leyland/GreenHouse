import React, {useState, useEffect} from 'react';

type renderConditionObject = {
    energyTariff: boolean;
    flatStoreyCount: boolean;
    floorLevel: boolean;
    flatTopStorey: boolean;
  };
  
export default function ExtraHouseInfo(props: any) {
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
  
    let divBaseStyle = 'mr-2 inline-block py-2';
    let spanDarkLabel = 'text-zinc-800 font-bold';
  
    //Potentially clean this up a tad, is a bit confusing atm
    return (
      <div className="w-full flex flex-col">

        <div className={divBaseStyle}>
          {' '}
          <span className={spanDarkLabel}>Last Inspection Date:  </span>
          {props.data.inspectionDate}
        </div>

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
