import React, { useState, useEffect } from 'react';
import { epcRecommendationObject } from '../../types';
import Recommendation from './recommendationCard';
import { v4 as uuid } from 'uuid';
import Arrow from '../../assets/arrow-left.svg';

interface props {
  data: Array<epcRecommendationObject>;
  isMobile: boolean;
}

export default function RecCardGallery({ data, isMobile }: props) {
  const [activeView, setActiveView] = useState<string>('Outstanding');
  const [recData, setRecData] = useState<Array<epcRecommendationObject>>(data);
  const [noRecs, setNoRecs] = useState<boolean>(false);

  useEffect(() => {
    if (recData.length == 0) {
      setNoRecs(true);
      return;
    }
  }, [recData]);

  // Could cause weird behavior if I'm wrong about how
  // epc sends these back
  function formatCostString(str: string): string {
    let formatted = str.replace(/[?]/g, '£');
    return formatted;
  }
  return (
    <>
      <div className="sticky top-[68px] z-10 w-full h-[50px] flex justify-center animate-fade">
        <div className="w-[95%] flex items-center rounded-default bg-gray-200 pr-2 pl-2 ">
          <div className="w-[100%] h-[100%] flex justify-center items-center">
            <span
              className={
                'h-[100%] mr-2 pl-2 pr-2 flex items-center rounded-default cursor-pointer opacity-80 ' +
                (activeView == 'Outstanding'
                  ? 'bg-primary font-medium'
                  : 'hover:bg-primary')
              }
              onClick={() => {
                setActiveView('Outstanding');
              }}
            >
              Outstanding
            </span>
            <span
              className={
                'h-[100%] mr-2 pl-2 pr-2 flex items-center rounded-default cursor-pointer opacity-80 ' +
                (activeView == 'Completed'
                  ? 'bg-primary font-medium'
                  : 'hover:bg-primary')
              }
              onClick={() => {
                setActiveView('Completed');
              }}
            >
              Completed
            </span>
          </div>
        </div>
        {noRecs && (
          <div className="flex w-[95%] justify-center mt-2">
            There are no available recommendations for this property!
          </div>
        )}
      </div>
      <div className="flex justify-center animate-fade">
        {' '}
        <div className="w-[95%] flex flex-wrap justify-center items-center mt-2 sm:flex-row flex-col">
          {/* This is mildy hacky, might change later */}

          {recData.map((elem) => {
            if (activeView == 'Outstanding') {
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
            } else if (activeView == 'Completed') {
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
        </div>
      </div>
    </>
  );
}
