import React, { useEffect, useState, useRef } from "react";
import { epcRecommendationObject } from "../../types";
import { useAppContext } from "../../context/state";
import { HeatingCategories } from "../../types";
import RecForm from "./recForm";

interface props {
  improvementId: epcRecommendationObject["improvementId"];
  improvementIdText: epcRecommendationObject["improvementIdText"];
  indicativeCost?: epcRecommendationObject["indicativeCost"];
  date?: epcRecommendationObject["date"];
  cost?: epcRecommendationObject["cost"];
  isMobile: boolean;
  isCompleted?: boolean;
  isLocal?: boolean;
  averageCost?: number;
  frequency?: number;
  setActiveView?: any;
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
  isMobile,
  isCompleted,
  date,
  cost,
  isLocal,
  averageCost,
  frequency,
  setActiveView,
}: props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [lmk, setLmk] = useState<string>("");
  const GlobalContext = useAppContext();
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
    case "Heating":
      color = "border-2 border-red-400";
      break;
    case "Water":
      color = "border-2 border-blue-400";
      break;
    case "Lighting":
      color = "border-2 border-yellow-400";
      break;
    case "Other":
      color = "border-2 border-slate-400";
      break;
    default:
      color = "border-2 border-gray-400";
  }

  function handleFormCancel() {
    setShowForm(false);
  }

  function showFormHandler() {
    setShowForm(!showForm);
  }

  return (
    <div
      className={
        "flex flex-row justify-center h-[400px] md:w-1/4 w-full md:px-4 py-3 "
      }
      ref={wrapperRef}
    >
      {isCompleted && !isLocal && (
        <CompletedView
          improvementIdText={improvementIdText}
          category={category}
          date={date}
          cost={cost}
        />
      )}
      {!isCompleted && !isLocal && (
        <IncompleteView
          improvementId={improvementId}
          improvementIdText={improvementIdText}
          indicativeCost={indicativeCost}
          lmk={lmk}
          postcode={postcode}
          color={color}
          category={category}
          handleFormCancel={handleFormCancel}
          showForm={showForm}
          showFormHandler={showFormHandler}
        />
      )}
      {isLocal && (
        <NeighborhoodView
          improvementIdText={improvementIdText}
          averageCost={averageCost}
          frequency={frequency}
          category={category}
          color={color}
          setActiveView={setActiveView}
        />
      )}
    </div>
  );
}

interface incompleteViewProps {
  improvementId: epcRecommendationObject["improvementId"];
  improvementIdText: epcRecommendationObject["improvementIdText"];
  indicativeCost?: epcRecommendationObject["indicativeCost"];
  lmk: string;
  showForm: boolean;
  postcode: string;
  handleFormCancel: React.MouseEventHandler;
  showFormHandler: React.MouseEventHandler;
  color: string | undefined;
  category: string;
}

function IncompleteView({
  improvementId,
  improvementIdText,
  indicativeCost,
  lmk,
  postcode,
  color,
  category,
  showForm,
  handleFormCancel,
  showFormHandler,
}: incompleteViewProps) {
  return (
    <>
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
            "rounded-lg w-full text-gray-600 flex flex-col relative overflow-hidden bg-white " +
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
          <div className="w-full flex items-center justify-center p-6 flex-col">
            <div>
              <h2 className="text-sm tracking-widest title-font mb-1 font-bold">
                Estimated Cost
              </h2>
            </div>
            {indicativeCost ? (
              <span className="text-center">{indicativeCost}</span>
            ) : (
              <span>No indicative cost is available.</span>
            )}
          </div>
          <div className="p-6 pb-2 absolute bottom-0 w-full">
            <button
              onClick={showFormHandler}
              className={
                "flex justify-center mt-auto text-xs md:text-base  border-0 py-2 px-4 w-full rounded  hover:bg-opacity-100 bg-opacity-90 text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " +
                (showForm ? "bg-red-200" : "bg-white")
              }
            >
              {showForm ? "Cancel" : "I've done this!"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

interface completedViewProps {
  improvementIdText: epcRecommendationObject["improvementIdText"];
  category: string;
  date?: epcRecommendationObject["date"];
  cost?: epcRecommendationObject["cost"];
}

function CompletedView({
  improvementIdText,
  date,
  cost,
  category,
}: completedViewProps) {
  let strippedDate = date?.replace(/"/g, "");
  return (
    <div
      className={
        "rounded-lg w-full text-gray-600 flex flex-col relative overflow-hidden border-2 border-primary bg-white"
      }
    >
      <div className="p-6 h-[40%]">
        <h2 className="text-sm tracking-widest title-font mb-1 font-bold">
          {category}
        </h2>
        <h1 className="text-[1.5rem] pb-4 mb-4 leading-none">
          {improvementIdText}
        </h1>
        <h2 className="text-sm tracking-wide title-font mb-1 font-bold">
          You completed this improvement on <strong>{strippedDate}</strong>.
          Nice work!
        </h2>
        <br />
        <h2 className="text-sm tracking-wide title-font mb-1 font-bold">
          You let us know that it cost you <strong>£{cost}</strong>.
        </h2>
        <br />
        <h2 className="text-xs tracking-wide title-font mb-1 font-bold">
          This information will help us let others in your neighborhood know how
          much they can expect their own improvements to cost!
        </h2>
      </div>
    </div>
  );
}

interface neighborhoodViewProps {
  improvementIdText: any;
  category: string;
  averageCost?: number;
  frequency?: number;
  color: string | undefined;
  setActiveView: any;
}

function NeighborhoodView({
  improvementIdText,
  averageCost,
  frequency,
  category,
  color,
  setActiveView,
}: neighborhoodViewProps) {
  return (
    <div
      className={
        "rounded-lg w-full text-gray-600 flex flex-col relative overflow-hidden bg-white " +
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
        <h2 className="text-sm tracking-wide title-font mb-1 font-medium">
          <strong>{frequency}</strong> of your neighbors have reported
          completing this upgrade.
        </h2>
        <br />
        <h2 className="text-sm tracking-wide title-font mb-1 font-medium">
          They have reported an average cost of <strong>£{averageCost}</strong>.
        </h2>
        <br />
        <h2 className="text-xs tracking-wide title-font mb-1 font-medium">
          If you have also completed this upgrade, make sure you{" "}
          <span
            className="text-blue-400 underline cursor-pointer"
            onClick={() => setActiveView("Outstanding")}
          >
            let us know!
          </span>
        </h2>
      </div>
    </div>
  );
}
