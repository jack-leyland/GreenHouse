import React, { useEffect, useState, useRef } from "react";
import { epcRecommendationObject } from "../../types";
import { useAppContext } from "../../context/state";
import { HeatingCategories } from "../../types";
import RecForm from "./recForm";

interface props {
  improvementId: epcRecommendationObject["improvementId"];
  improvementIdText: epcRecommendationObject["improvementIdText"];
  indicativeCost: epcRecommendationObject["indicativeCost"];
}

function useOutsideClick(ref: React.RefObject<HTMLDivElement>, handler: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    function handleClickOutside(event: React.MouseEvent) {
      console.log(ref.current);
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside as any);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, [ref]);
}

export default function Recommendation({
  improvementId,
  improvementIdText,
  indicativeCost,
}: props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [lmk, setLmk] = useState<string>("");
  const GlobalContext = useAppContext();
  const [color, setColor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");

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
      setPostcode(localStorage.extraHouseInfo.postcode);
    }
  }, [GlobalContext.extraHouseInfo]);

  useOutsideClick(wrapperRef, () => {
    setShowForm(false);
  });

  useEffect(() => {
    setCategory(HeatingCategories[improvementId]); // This works, idk what to do with the error
    switch (category) {
      case "Heating":
        setColor("bg-red-500");
        break;
      case "Water":
        setColor("bg-blue-500");
        break;
      case "Lighting":
        setColor("bg-yellow-500");
        break;
      case "Other":
        setColor("bg-slate-500");
        break;
    }
  }, [category]);

  return (
    <div className="flex flex-row justify-center p-4 mx-5" ref={wrapperRef}>
      <div className={"h-full rounded-lg text-white flex flex-col " + color}>
        <div className="p-6">
          <h2 className="text-sm tracking-widest title-font mb-1 font-bold">
            {category}
          </h2>
          <h1 className="text-base pb-4 mb-4 border-b leading-none">
            {improvementIdText}
          </h1>
        </div>
        <div className="w-full flex items-center justify-center p-6">
          <span className="text-center">{indicativeCost} estimated cost</span>
        </div>
        <div className="p-6 pb-2 bottom-0 w-full flex justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className={
              "flex justify-center mt-auto text-gray-900 border-0 py-2 px-4 focus:outline-none hover:bg-gray-100 rounded font-bold " +
              (showForm ? "bg-red-200" : "bg-white")
            }
          >
            {showForm ? "Cancel" : "I've done this!"}
          </button>
        </div>
      </div>
      {/* Form goes here */}
      {showForm && (
        <RecForm
          color={color}
          improvementId={improvementId}
          lmk={lmk}
          postcode={postcode}
        />
      )}
    </div>
  );
}
