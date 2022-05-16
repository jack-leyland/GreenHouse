import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { gql, useMutation } from "@apollo/client";
import { useAppContext } from "../../context/state";
import { GET_REC_DATA } from "../../pages/api/queries";

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
  heading: string;
  cancelHandler: React.MouseEventHandler;
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
  heading,
  cancelHandler,
}: props) {
  const GlobalContext = useAppContext();
  const [addImprovement, { data, loading, error }] = useMutation(
    ADD_IMPROVEMENT,
    {
      refetchQueries: [GET_REC_DATA],
    }
  );

  const [isSubmissionError, setIsSubmissionError] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (error) setIsSubmissionError(true);
  }, [error]);

  //Could any of these improvements be made for free?
  function validateCost(value: number): string | undefined {
    if (value == 0) return "Improvement cost is required.";
  }

  function validateDate(value: string): string | undefined {
    if (value == "") return "Date is required";
  }

  function validateAgreement(value: boolean): string | undefined {
    if (!value) return "Required";
  }

  // TODO: Instead of the "Thanks for Submission" thing
  // it should just set the completed flag and change the filter and formatting
  // by itself.

  return (
    <div
      className={
        "h-full px-6 pt-6 rounded-lg text-gray-600 flex flex-col justify-center relative overflow-hidden bg-white " +
        (!data ? color : "")
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
        <div className="h-full w-full overflow-y-hidden">
          <span className="text-2xl py-2leading-none">{heading}</span>
          <div className="h-full flex-row space-between py-4">
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
                values: Values
                // { setSubmitting }: FormikHelpers<Values>
              ) => {
                addImprovement({
                  variables: {
                    lmkKey: values.lmkKey,
                    date: JSON.stringify(values.date),
                    cost: values.cost,
                    improvementId: values.improvementId,
                    postcode: postcode,
                  },
                });
                //Causes react error, need some other way of verifying submit success

                // setTimeout(() => {
                //   setSubmitting(false);
                // }, 500);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="relative mb-2">
                    <label htmlFor="cost">How much did it cost you (£)?</label>
                    <Field
                      validate={validateCost}
                      id="cost"
                      name="cost"
                      type="number"
                      disabled={data ? true : false}
                      className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {errors.cost && (
                      <div className="text-red-500 text-sm">{errors.cost}</div>
                    )}
                  </div>
                  <div className="relative mb-2">
                    <label htmlFor="date">Date</label>
                    <Field
                      validate={validateDate}
                      id="date"
                      name="date"
                      type="date"
                      disabled={data ? true : false}
                      className="w-full bg-white rounded border border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {errors.date && (
                      <div className="text-red-500 text-sm">{errors.date}</div>
                    )}
                  </div>
                  <div className="relative mb-2">
                    <div className="w-full flex justify-center items-center flex-col py-2">
                      <div>
                        <span className="mr-2 mb-1">Agree to share data</span>{" "}
                        <Field
                          validate={validateAgreement}
                          id="agree"
                          name="agree"
                          type="checkbox"
                          disabled={data ? true : false}
                          className="bg-white rounded border border-gray-300 focus:border-green-500 text-base outline-none "
                        />
                      </div>

                      {errors.agree && (
                        <span className="text-red-500 text-sm">
                          {errors.agree}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className=" w-full flex justify-center py-3">
                    <button
                      type="submit"
                      disabled={data ? true : false}
                      className="mr-2 w-1/2 text-white py-1 md:px-6 px-2 focus:outline-none rounded hover:bg-opacity-100 bg-opacity-90 bg-primary"
                    >
                      Submit
                    </button>
                    <button
                      onClick={cancelHandler}
                      className="text-white w-1/2 bg-gray-400 border-0 py-1 md:px-6 px-2 focus:outline-none hover:bg-red-400 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
