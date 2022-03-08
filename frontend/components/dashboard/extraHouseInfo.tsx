import React, { useState, useEffect, useRef } from "react";
import { epcCertificateObject } from "../../types";

type renderConditionObject = {
  energyTariff: boolean;
  flatStoreyCount: boolean;
  floorLevel: boolean;
  flatTopStorey: boolean;
};

interface props {
  data: epcCertificateObject["ExtraInfo"];
}

export default function ExtraHouseInfo({ data }: props) {
  const [renderConditions, setRenderConditions] =
    useState<renderConditionObject>();

  useEffect(() => {
    if (!data) return;
    let tempRenderConditions: renderConditionObject = {
      energyTariff: false,
      flatStoreyCount: false,
      floorLevel: false,
      flatTopStorey: false,
    };
    if (data.flatStoreyCount) tempRenderConditions.flatStoreyCount = true;
    if (data.energyTariff && data.energyTariff.toLowerCase() != "unknown")
      tempRenderConditions.energyTariff = true;
    if (
      data.floorLevel &&
      parseInt(data.floorLevel) != NaN &&
      parseInt(data.floorLevel) > 0
    ) {
      tempRenderConditions.floorLevel = true;
    }
    if (
      data.flatTopStorey &&
      (data.flatTopStorey.toLowerCase() == "n" ||
        data.flatTopStorey.toLowerCase() == "y")
    ) {
      tempRenderConditions.flatTopStorey = true;
    }
    setRenderConditions(tempRenderConditions);
  }, [data]);

  let divBaseStyle = "mr-2 inline-block py-2";
  let spanDarkLabel = "text-zinc-700 font-bold";

  //Potentially clean this up a tad, is a bit confusing atm
  return (
    <div className="w-full flex flex-col p-2">
      <div className={divBaseStyle}>
      <div className="font-bold text-lg pt-2 mb-2 w-full border border-x-0 border-t-0">Additional Information</div>
        {" "}
        <span className={spanDarkLabel}>Last Inspection Date: </span>
        {data.inspectionDate}
      </div>

      <div className={divBaseStyle}>
        {" "}
        <span className={spanDarkLabel}>Property Type: </span>
        {data.propertyType}
      </div>

      <div className={divBaseStyle}>
        <span className={spanDarkLabel}>Total Floor Area: </span>
        {data.totalFloorArea}m<sup>2</sup>
      </div>

      <div className={divBaseStyle}>
        <span className={spanDarkLabel}>Built From: </span>
        {data.builtForm}
      </div>

      <div className={divBaseStyle}>
        <span className={spanDarkLabel}>Construction Age Band: </span>
        {data.constructionAgeBand}
      </div>

      <div className={divBaseStyle}>
        <span className={spanDarkLabel}>Energy Tariff:</span>{" "}
        {renderConditions?.energyTariff ? data.energyTariff : "Not available"}
      </div>

      {renderConditions?.flatStoreyCount ? (
        <div className={divBaseStyle}>
          <span className={spanDarkLabel}>Flat Storey Count: </span>
          {data.flatStoreyCount}
        </div>
      ) : null}

      {renderConditions?.flatTopStorey ? (
        <div className={divBaseStyle}>
          <span className={spanDarkLabel}>Flat is Top Storey: </span>
          {data.flatTopStorey.toLowerCase() == "n" ? "No" : "Yes"}{" "}
        </div>
      ) : null}

      {renderConditions?.floorLevel ? (
        <div className={divBaseStyle}>
          <span className={spanDarkLabel}>Floor Level: </span>
          {parseInt(data.floorLevel)}{" "}
        </div>
      ) : null}
    </div>
  );
}
