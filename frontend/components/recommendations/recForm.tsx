import React, { useEffect, useState, useRef } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { gql, useMutation } from '@apollo/client';

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

interface props {
  color: string;
  lmk: string;
  improvementId: string;
}

interface Values {
  cost: number;
  date: string;
  improvementId: string;
  lmkKey: string;
}

export default function RecForm({ color, lmk, improvementId }: props) {
  const [addImprovement, { data, loading, error }] =
    useMutation(ADD_IMPROVEMENT);
  const [isSubmissionError, setIsSubmissionError] = useState<boolean>(false);

  useEffect(() => {
    if (error) setIsSubmissionError(true);
  }, [error]);

  //Needs work here
  if (loading) return <p>Submitting...</p>;

  return (
    <div
      className={
        'h-full max-w-[58%] p-6 rounded-lg border-2 text-white flex flex-col relative overflow-hidden ' +
        color
      }
    >
      {isSubmissionError && (
        <span>Something went wrong with the submission</span>
      )}
      {!isSubmissionError && (
        <div className="flex-row space-between">
          <span className="text-lg mb-1 font-bold title-font">
            Tell us more!
          </span>
          <Formik
            initialValues={{
              cost: 0,
              date: '',
              lmkKey: lmk,
              improvementId: improvementId,
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
              <div className=" w-full flex justify-center">
                <button
                  type="submit"
                  disabled={data ? true : false}
                  className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                >
                  {data ? "You've already told us!" : 'Submit'}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}
