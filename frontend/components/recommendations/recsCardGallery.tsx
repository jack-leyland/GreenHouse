import React, { useState, useEffect } from "react";
import {
  epcRecommendationObject,
  localRecommendationObject,
} from "../../types";
import Recommendation from "./recommendationCard";
import { v4 as uuid } from "uuid";
import idTexts from "../../idTexts.json";

interface props {
  data: Array<epcRecommendationObject>;
  regionData: Array<localRecommendationObject>;
  isMobile: boolean;
}

export default function RecCardGallery({ data, isMobile, regionData }: props) {
  const [activeView, setActiveView] = useState<string>("Outstanding");
  const [recData, setRecData] = useState<Array<epcRecommendationObject>>(data);
  const [regionRecData, setRegionRecData] =
    useState<Array<localRecommendationObject>>(regionData);
  const [noRecs, setNoRecs] = useState<boolean>(false);
  const [noCompleted, setNoCompleted] = useState<boolean>(true);
  const [noRegionRecs, setNoRegionRecs] = useState<boolean>(false);

  useEffect(() => {
    setRecData(data);
    setRegionRecData(regionData);
  }, [data, regionData]);

  useEffect(() => {
    if (recData.length == 0) {
      setNoRecs(true);
    }

    if (regionRecData.length == 0) {
      setNoRegionRecs(true);
    }

    recData.forEach((elem) => {
      if (elem.completed) setNoCompleted(false);
    });
  }, [recData, regionRecData]);

  // Could cause weird behavior if I'm wrong about how
  // epc sends these back
  function formatCostString(str: string): string {
    let formatted = str.replace(/[?]/g, "£");
    return formatted;
  }
  return (
    <>
      <div className="sticky top-[68px] z-10 w-full h-[50px] flex justify-center animate-fade">
        <div className="w-[95%] flex justify-center items-center rounded-default bg-gray-200 pr-2 pl-2 ">
          <div className="flex  items-center">
            <span
              className={
                " px-3 py-2 font-medium text-sm rounded-md cursor-pointer " +
                (activeView == "Outstanding"
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:text-gray-700")
              }
              onClick={() => {
                setActiveView("Outstanding");
              }}
            >
              Outstanding
            </span>
            <span
              className={
                " px-3 py-2 font-medium text-sm rounded-md cursor-pointer " +
                (activeView == "Completed"
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:text-gray-700")
              }
              onClick={() => {
                setActiveView("Completed");
              }}
            >
              Completed
            </span>
            <span
              className={
                " px-3 py-2 font-medium text-sm rounded-md cursor-pointer " +
                (activeView == "Neighborhood"
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:text-gray-700")
              }
              onClick={() => {
                setActiveView("Neighborhood");
              }}
            >
              Area Insights
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center animate-fade">
        {" "}
        <div className="w-[95%] flex flex-wrap justify-center items-center mt-2 sm:flex-row flex-col">
          {/* This is mildy hacky, might change later */}
          {noRecs && activeView == "Outstanding" && (
            <div className="flex w-full text-gray-500 justify-center mt-2">
              There are no available recommendations for this property!
            </div>
          )}
          {!noRecs && noCompleted && activeView == "Completed" && (
            <div className="flex w-full text-gray-500 justify-center mt-2">
              {"You haven't reported any improvements yet!"}
            </div>
          )}
          {noRecs && noCompleted && activeView == "Completed" && (
            <div className="flex w-full text-gray-500 justify-center mt-2">
              There are no available recommendations for this property!
            </div>
          )}
          {noRegionRecs && activeView == "Neighborhood" && (
            <div className="flex w-full text-gray-500 justify-center mt-2">
              {
                "Unfortunately, we haven't yet collected any data on improvements made in your neighborhood."
              }
            </div>
          )}
          {recData.map((elem) => {
            if (activeView == "Outstanding") {
              if (!elem.completed) {
                return (
                  <Recommendation
                    indicativeCost={formatCostString(elem.indicativeCost)}
                    improvementId={elem.improvementId}
                    improvementIdText={elem.improvementIdText}
                    key={uuid()}
                    isMobile={isMobile}
                    isCompleted={false}
                  />
                );
              }
            } else if (activeView == "Completed") {
              if (elem.completed) {
                return (
                  <Recommendation
                    indicativeCost={formatCostString(elem.indicativeCost)}
                    improvementId={elem.improvementId}
                    improvementIdText={elem.improvementIdText}
                    cost={elem.cost}
                    date={elem.date}
                    key={uuid()}
                    isMobile={isMobile}
                    isCompleted={true}
                  />
                );
              }
            }
          })}
          {regionRecData &&
            activeView == "Neighborhood" &&
            regionRecData.map((elem) => {
              return (
                <Recommendation
                  averageCost={elem.averageCost}
                  frequency={elem.frequency}
                  improvementId={elem.improvementId}
                  improvementIdText={
                    (idTexts as any)[parseInt(elem.improvementId)]
                  }
                  key={uuid()}
                  isMobile={isMobile}
                  isLocal={true}
                  setActiveView={setActiveView}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
