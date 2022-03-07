import React, { useState, useEffect } from 'react';
import { epcRecommendationObject } from '../../types';
import Recommendation from './recommendationCard';
import { v4 as uuid } from 'uuid';
import Arrow from '../../assets/arrow-left.svg';

interface props {
  data: Array<Array<epcRecommendationObject>>;
}

//BIG TODO: Each recommendation needs a completed flag from backend

export default function RecCostSummary({ data }: props) {
  const [activePage, setActivePage] = useState<number>(0);
  const [activePageRecs, setActivePageRecs] = useState<
    Array<epcRecommendationObject>
  >([]);
  const [activeView, setActiveView] = useState<string>('Outstanding');
  const [recData, setRecData] =
    useState<Array<Array<epcRecommendationObject>>>(data);
  const [noRecs, setNoRecs] = useState<boolean>(false);

  useEffect(() => {
    if (recData[0].length == 0) {
      setNoRecs(true);
      return;
    }
    setActivePageRecs(recData[activePage]);
  }, [recData, activePage]);

  // Could case weird behavior if I'm wrong about how
  // epc sends these back
  function formatCostString(str: string): string {
    let formatted = str.replace(/[?]/g, '£');
    return formatted;
  }

  function handlePageChange(newPgNum: number) {
    if (newPgNum >= recData.length) return;
    setActivePage(newPgNum);
  }

  //It's worth noting that this will not handle large amounts of pages
  //I'm assuming here that there wont be more than like 12 recommendations or so
  let pageButtons: JSX.Element[] = [];
  for (var i = 0; i < data.length; i++) {
    let isActive = i == activePage ? true : false;
    pageButtons.push(
      <PageButton
        key={uuid()}
        pgNum={i}
        handler={handlePageChange}
        isActive={isActive}
      />
    );
  }
  console.log(noRecs);
  return (
    <div className="w-full h-full relative flex-row justify-center">
      <div className="w-full h-[10%] max-h-[50px] flex justify-center">
        <div className="w-[95%] flex items-center rounded-default bg-gray-200 pr-2 pl-2">
          <div className="w-[50%] h-[100%] flex items-center">
            <span className="h-[100%] mr-2 pl-2 pr-2 flex items-center rounded-default">
              Outstanding
            </span>
            <span className="h-[100%] mr-2 pl-2 pr-2 flex items-center rounded-default">
              Completed
            </span>
          </div>
          {!noRecs && (
            <div className="max-w-[50%] w-[50%] h-[100%] pr-2 flex justify-end items-center">
              <span className="mr-2">Page: </span>
              {pageButtons.map((elem, index) => {
                return pageButtons[index];
              })}
              <Arrow
                className=" ml-2 h-[25px] w-[25px] rotate-180 fill-gray-700 rounded-default hover:bg-logoGreenLight cursor-pointer"
                onClick={() => handlePageChange(activePage + 1)}
              />
            </div>
          )}
        </div>
      </div>
      {noRecs && (
        <div className="flex w-[95%] justify-center mt-2">
          There are no available recommendations for this property!
        </div>
      )}
      <div className="w-full h-[85%] flex justify-center animate-fade  ">
        <div className="flex w-[95%] justify-center mt-2">
          {/* This is mildy hacky, might change later */}
          {activePageRecs[0] ? (
            <Recommendation
              indicativeCost={formatCostString(
                activePageRecs[0].indicativeCost
              )}
              improvementId={activePageRecs[0].improvementId}
              improvementIdText={activePageRecs[0].improvementIdText}
              key={uuid()}
            />
          ) : null}
          {activePageRecs[1] ? (
            <Recommendation
              indicativeCost={formatCostString(
                activePageRecs[1].indicativeCost
              )}
              improvementId={activePageRecs[1].improvementId}
              improvementIdText={activePageRecs[1].improvementIdText}
              key={uuid()}
            />
          ) : null}
          {activePageRecs[2] ? (
            <Recommendation
              indicativeCost={formatCostString(
                activePageRecs[2].indicativeCost
              )}
              improvementId={activePageRecs[2].improvementId}
              improvementIdText={activePageRecs[2].improvementIdText}
              key={uuid()}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface pageButtonProps {
  pgNum: number;
  isActive: boolean;
  handler: (pgNum: number) => void;
}

function PageButton({ pgNum, isActive, handler }: pageButtonProps) {
  let style =
    'mr-2 h-[100%] pl-2 pr-2 flex items-center rounded-default text-center w-[25px] hover:bg-logoGreenLight cursor-pointer';
  if (isActive) {
    style =
      'mr-2 h-[100%] pl-2 pr-2 flex items-center rounded-default text-center w-[25px] bg-logoGreenLight font-bold cursor-pointer';
  }
  return (
    <span className={style} onClick={(e) => handler(pgNum)}>
      {pgNum + 1}
    </span>
  );
}
