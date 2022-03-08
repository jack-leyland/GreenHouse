import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { gql, useMutation } from "@apollo/client";
import { useAppContext } from "../../context/state";

const ADD_IMPROVEMENT = gql`
  mutation AddImprovement(
    $lmkKey: String!
    $date: String!
    $cost: Float!
    $improvementId: String!
    $postcode: String!
  ) {
    addImprovement(
      lmkKey: $lmkKey
      date: $date
      cost: $cost
      improvementId: $improvementId
      postcode: $postcode
    ) {
      ok
      improvement {
        lmkKey
        date
        cost
        improvementId
        postcode
      }
    }
  }
`;

interface props {
  color: string | undefined;
  lmk: string;
  improvementId: string;
  postcode: string;
}

interface Values {
  cost: number;
  date: string;
  improvementId: string;
  lmkKey: string;
  postcode: string;
  agree: boolean;
}

export default function RecForm({
  color,
  lmk,
  postcode,
  improvementId,
}: props) {
  const GlobalContext = useAppContext();
  const [addImprovement, { data, loading, error }] =
    useMutation(ADD_IMPROVEMENT);

  const [isSubmissionError, setIsSubmissionError] = useState<boolean>(false);
  const [postcode, setPostcode] = useState<string>("");

  useEffect(() => {
    if (error) setIsSubmissionError(true);
  }, [error]);

  //Could any of these improvements be made for free?
  function validateCost(value: number): string | undefined {
    if (value == 0) return 'Improvement cost is required.';
  }

  function validateDate(value: string): string | undefined {
    if (value == '') return 'Date is required';
  }

  function validateAgreement(value: boolean): string | undefined {
    if (!value) return 'Required';
  }

  // TODO: Instead of the "Thanks for Submission" thing
  // it should just set the completed flag and change the filter and formatting
  // by itself.

  return (
    <div
      className={
        "h-full max-w-[58%] p-6 rounded-lg border-2 text-white flex flex-col justify-center relative overflow-hidden " +
        color
      }
    >
      {isSubmissionError && (
        <span>Something went wrong with the submission</span>
      )}
      {loading && <span>Submitting...</span>}
      {data && (
        <div className=" w-full h-full flex items-center text-center justify-center">
          Thanks for your submission!
        </div>
      )}
      {!isSubmissionError && !loading && !data && (
        <div className="flex-row space-between">
          <span className="text-lg mb-1 font-bold title-font">
            Tell us more!
          </span>
          <Formik
            initialValues={{
              cost: 0,
              date: "",
              lmkKey: lmk,
              improvementId: improvementId,
              postcode: postcode,
              agree: false,
            }}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              console.log(values);
              addImprovement({
                variables: {
                  lmkKey: values.lmkKey,
                  date: JSON.stringify(values.date),
                  cost: values.cost,
                  improvementId: values.improvementId,
                  postcode: values.postcode,
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
              <div className=" w-full flex justify-center">
                <button
                  type="submit"
                  disabled={data ? true : false}
                  className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                >
                  {data ? "You've already told us!" : "Submit"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}
