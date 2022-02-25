import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { epcRecommendationObject } from "../types";
import { gql, useMutation } from "@apollo/client";
import { useAppContext } from "../context/state";
import categories from "../categories.json";
import { MdColorLens } from "react-icons/md";

interface Values {
  cost: number;
  date: string;
  improvementId: string;
  lmkKey: string;
}
interface props {
  key: number;
  recs: epcRecommendationObject;
}

const ADD_IMPROVEMENT = gql`
  mutation addImprovement(
    $lmkKey: String!
    $date: String!
    $cost: Float!
    $improvementId: String!
  ) {
    addImprovement(
      lmkKey: $lmkKey
      date: $date
      cost: $cost
      improvementId: $improvementId
    ) {
      ok
      improvement {
        lmkKey
        date
        cost
        improvementId
      }
    }
  }
`;

export default function Recommendation(props: props) {
  const [showForm, setShowForm] = useState(false);
  const [lmk, setLmk] = useState<string>("");
  const GlobalContext = useAppContext();
  const [addImprovement, { data, loading, error }] =
    useMutation(ADD_IMPROVEMENT);

  useEffect(() => {
    if (GlobalContext.activeLmk) {
      setLmk(GlobalContext.activeLmk);
    } else {
      setLmk(localStorage.activeLmk);
    }
  }, [GlobalContext.activeLmk]);

  const category = categories[0][props.recs.improvementId]; // This works, idk what to do with the error
  let color;
  switch (category) {
    case "Heating":
      color = "bg-red-500";
      break;
    case "Water":
      color = "bg-blue-500";
      break;
    case "Lighting":
      color = "bg-yellow-500";
      break;
    case "Other":
      color = "bg-slate-500";
      break;
  }

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>Submission error! ${error.message}</p>;

  return (
    <div className="flex flex-row p-4 mx-10">
      <div
        className={
          "h-full rounded-lg border-2 text-white flex flex-col relative overflow-hidden w-72 " +
          color
        }
      >
        <div className="p-6">
          <h2 className="text-sm tracking-widest title-font mb-1 font-bold">
            {category}
          </h2>
          <h1 className="text-3xl pb-4 mb-4 border-b leading-none">
            {props.recs.improvementIdText}
          </h1>
        </div>
        <div className="w-full flex items-center mb-2">
          <p className="p-6">{props.recs.indicativeCost} estimated cost</p>
        </div>
        <div className="p-6 pb-2 absolute bottom-0 w-full">
          <button
            onClick={() => setShowForm(!showForm)}
            className={
              "flex justify-center mt-auto text-black border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded font-bold " +
              (showForm ? "bg-red-200" : "bg-white")
            }
          >
            {showForm ? "Cancel" : "I've done this!"}
          </button>
        </div>
      </div>
      {/* Form goes here */}
      {showForm && (
        <div className="w-full">
          <div className="h-full p-6 rounded-lg border-2 bg-green-400 text-white flex flex-col relative overflow-hidden">
            <div>
              <h1 className="text-lg mb-1 font-bold title-font">
                Tell us more!
              </h1>
              <Formik
                initialValues={{
                  cost: 0,
                  date: "",
                  lmkKey: lmk,
                  improvementId: props.recs.improvementId,
                }}
                onSubmit={(
                  values: Values,
                  { setSubmitting }: FormikHelpers<Values>
                ) => {
                  addImprovement({
                    variables: {
                      lmkKey: values.lmkKey,
                      date: JSON.stringify(values.date),
                      cost: values.cost,
                      improvementId: values.improvementId,
                    },
                  });
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 500);
                }}
              >
                <Form>
                  <div className="relative mb-4">
                    <label htmlFor="cost">How much did it cost you (£)?</label>
                    <Field
                      id="cost"
                      name="cost"
                      type="number"
                      disabled={data ? true : false}
                      className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="date">Date</label>
                    <Field
                      id="date"
                      name="date"
                      type="date"
                      disabled={data ? true : false}
                      className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label htmlFor="agree">Agree</label>
                    <Field
                      id="agree"
                      name="agree"
                      type="checkbox"
                      disabled={data ? true : false}
                      className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={data ? true : false}
                    className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                  >
                    {data ? "You've already told us!" : "Submit"}
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
