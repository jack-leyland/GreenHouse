import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { epcRecommendationObject } from "../types";
import { gql, useMutation } from "@apollo/client";
import { useAppContext } from "../context/state";

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
  }, []);

  if (loading) return (<p>Submitting...</p>)
  if (error) return (<p>Submission error! ${error.message}</p>)

  return (
    <div className="flex flex-row p-4 mx-10">
      <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
        <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
          Improvement {props.recs.improvementItem}
        </h2>
        <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
          {props.recs.improvementIdText}
        </h1>
        <p className="flex items-center text-gray-600 mb-2">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0"></span>
          {props.recs.indicativeCost}
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded"
        >
          I've done this!
          {/* <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-auto"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg> */}
        </button>
        <p className="text-xs text-gray-500 mt-3"></p>
      </div>
      {/* Form goes here */}
      {showForm && (
        <div className="w-full">
          <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
            <div>
              <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">
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
                    <label htmlFor="cost">Cost</label>
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
