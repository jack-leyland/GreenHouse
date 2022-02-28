import React, { useState, useEffect } from 'react';
import { epcRecommendationObject } from '../../types';
import Recommendation from './recommendationCard';
import { v4 as uuid } from 'uuid';

interface props {
  data: Array<Array<epcRecommendationObject>>;
}

// Make landing back button more prominent
// More info button needs to be more prominent
export default function RecCostSummary({ data }: props) {
  const [activePage, setActivePage] = useState<number>(0);
  const [activePageRecs, setActivePageRecs] = useState<
    Array<epcRecommendationObject>
  >([]);
  const [activeView, setActiveView] = useState<string>('Outstanding');
  const [recData, setRecData] =
    useState<Array<Array<epcRecommendationObject>>>(data);

  useEffect(() => {
    setActivePageRecs(recData[activePage]);
  }, [recData]);

  useEffect(() => {}, [activePage]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-[10%] max-h-[50px] flex justify-center">
        <div className="w-[95%] p-3 flex rounded-default bg-gray-200">
          <div className="w-[50%] flex ">
            <span className="mr-2 border-b-2 border-gray-900">Outstanding</span>
            <span>Completed</span>
          </div>
          <div className="w-[50%] pr-9 flex justify-end">
            <span className="mr-2">Page: </span>
            <span className="mr-2 border-b-2 border-gray-900">1</span>
            <span>2</span>
          </div>
        </div>
      </div>
      <div className="flex h-[85%] justify-center mt-2">
        {/* This is mildy hacky, might change later */}
        {activePageRecs[0] ? (
          <Recommendation recs={activePageRecs[0]} key={uuid()} />
        ) : null}
        {activePageRecs[1] ? (
          <Recommendation recs={activePageRecs[1]} key={uuid()} />
        ) : null}
        {activePageRecs[2] ? (
          <Recommendation recs={activePageRecs[2]} key={uuid()} />
        ) : null}
      </div>
    </div>
  );
}
