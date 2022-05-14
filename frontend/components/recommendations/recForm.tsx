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
        "h-full px-6 pt-6 rounded-lg text-white flex flex-col justify-center relative overflow-hidden " +
        (!data ? color : "bg-gray-400")
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
        <div className="h-full w-full overflow-y-scroll scrollbar-hide">
          <span className="top-[5px] text-[1.5rem] pb-4 mb-4 leading-none">
            {heading}
          </span>
          <div className="h-full flex-row space-between mt-4">
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
                      className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {errors.cost && (
                      <div className="w-full rounded-default bg-gray-600 p-1 mt-1 text-sm flex justify-center">
                        {errors.cost}
                      </div>
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
                      className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {errors.date && (
                      <div className="w-full rounded-default bg-gray-600 p-1 mt-1 text-sm flex justify-center">
                        {errors.date}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-2">
                    <label htmlFor="agree">
                      Do you agree to share this data with us?
                    </label>
                    <div className="w-full flex justify-center items-center">
                      <span className="mr-2 mb-1">I agree</span>{" "}
                      <Field
                        validate={validateAgreement}
                        id="agree"
                        name="agree"
                        type="checkbox"
                        disabled={data ? true : false}
                        className="bg-white rounded border border-gray-300 focus:border-green-500 text-base outline-none "
                      />
                      {errors.agree && (
                        <span className=" ml-2 rounded-default bg-gray-600 p-1 mt-1 text-sm flex justify-center">
                          {errors.agree}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className=" w-full flex justify-center">
                    <button
                      type="submit"
                      disabled={data ? true : false}
                      className="mr-2 text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg"
                    >
                      Submit
                    </button>
                    <button
                      onClick={cancelHandler}
                      className="text-white bg-gray-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-400 rounded text-lg"
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
