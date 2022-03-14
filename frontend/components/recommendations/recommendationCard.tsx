import React, { useEffect, useState, useRef } from 'react';
import { epcRecommendationObject } from '../../types';
import { useAppContext } from '../../context/state';
import { HeatingCategories } from '../../types';
import RecForm from './recForm';

interface props {
  improvementId: epcRecommendationObject['improvementId'];
  improvementIdText: epcRecommendationObject['improvementIdText'];
  indicativeCost: epcRecommendationObject['indicativeCost'];
  isMobile: boolean;
}

//Close form if click outside the form
function useOutsideClick(ref: React.RefObject<HTMLDivElement>, handler: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    function handleClickOutside(event: React.MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside as any);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, [ref]);
}

export default function Recommendation({
  improvementId,
  improvementIdText,
  indicativeCost,
  isMobile
}: props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [lmk, setLmk] = useState<string>('');
  const GlobalContext = useAppContext();
  const [postcode, setPostcode] = useState<string>('');

  useEffect(() => {
    if (GlobalContext.activeLmk) {
      setLmk(GlobalContext.activeLmk);
    } else {
      setLmk(localStorage.activeLmk);
    }
  }, [GlobalContext.activeLmk]);

  useEffect(() => {
    if (GlobalContext.extraHouseInfo) {
      setPostcode(GlobalContext.extraHouseInfo.postcode);
    } else {
      let cachedInfo = JSON.parse(localStorage.extraHouseInfo);
      setPostcode(cachedInfo.postcode);
    }
  }, [GlobalContext.extraHouseInfo]);


  useOutsideClick(wrapperRef, () => {
    setShowForm(false);
  });

  let category = HeatingCategories[improvementId]; // This works, idk what to do with the error
  let color;
  switch (category) {
    case 'Heating':
      color = 'bg-red-500';
      break;
    case 'Water':
      color = 'bg-blue-500';
      break;
    case 'Lighting':
      color = 'bg-yellow-500';
      break;
    case 'Other':
      color = 'bg-slate-500';
      break;
  }


  function handleFormCancel() {
    setShowForm(false);
  }

  return (
    <div
      className={"flex flex-row justify-center h-[500px] w-[300px] " + (isMobile ? "mb-4" :"mx-5 my-4")}
      ref={wrapperRef}
    >

      {/* Form goes here */}
      {showForm ? (
        <RecForm
          color={color}
          improvementId={improvementId}
          lmk={lmk}
          postcode={postcode}
          heading={improvementIdText}
          cancelHandler={handleFormCancel}
        />
      ) : (      
      <div
        className={
          'rounded-lg w-full text-white flex flex-col relative overflow-hidden ' +
          color
        }
      >
        <div className="p-6 h-[40%]">
          <h2 className="text-sm tracking-widest title-font mb-1 font-bold">
            {category}
          </h2>
          <h1 className="text-[1.5rem] pb-4 mb-4 leading-none">
            {improvementIdText}
          </h1>
        </div>
        <div className="w-full flex items-center justify-center p-6">
          <span className="text-center">{indicativeCost} estimated cost</span>
        </div>
        <div className="p-6 pb-2 absolute bottom-0 w-full">
          <button
            onClick={() => setShowForm(!showForm)}
            className={
              'flex justify-center mt-auto text-black border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded font-bold ' +
              (showForm ? 'bg-red-200' : 'bg-white')
            }
          >
            {showForm ? 'Cancel' : "I've done this!"}
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
