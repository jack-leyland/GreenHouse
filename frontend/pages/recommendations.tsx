import { gql, useQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";
import Card from "../components/generic/card";
import Layout from "../components/generic/layout";
import PageTitle from "../components/generic/pageTitle";
import Sidebar from "../components/sidebar";
import Recommendation from "../components/recommendationCard";
import { useAppContext } from "../context/state";
import { epcRecommendationObject } from "../types";

const GET_RECOMMENDATIONS = gql`
  query recommendations($queryParam: String!) {
    recommendations(lmk: $queryParam) {
      lmkKey
      indicativeCost
      improvementIdText
      improvementItem
      improvementId
    }
  }
`;

const Recommendations = () => {
  const GlobalContext = useAppContext();
  const [queryParam, setQueryParam] = useState<string | null>(null);
  const [isQueryError, setIsQueryError] = useState<boolean>(false);
  const [queryData, setQueryData] = useState<Array<epcRecommendationObject>>(
    []
  );

  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS, {
    skip: !queryParam || isQueryError,
    variables: { queryParam },
  });

  // Use context if there, if not get from cache. Setting query param triggers query. This happens on client side.
  useEffect(() => {
    if (GlobalContext.activeLmk) {
      setQueryParam(GlobalContext.activeLmk);
    } else {
      setQueryParam(localStorage.activeLmk);
    }
  }, [GlobalContext.activeLmk]);

  useEffect(() => {
    if (data) {
      setQueryData(data.recommendations);
    }
  }, [data]);

  return (
    <section className="text-gray-600 body-font overflow-hidden h-screen">
      <div className="container px-5 mx-auto py-24 flex flex-row overflow-x-scroll flex-nowrap h-full">
        {queryData.map((item: epcRecommendationObject, key: number) => {
          return <Recommendation recs={item} key={key} />;
        })}
      </div>
    </section>
  );
};

Recommendations.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Address Dashboard" footerFixed={false}>
      <div className="flex overflow-hidden shadow-xl">
        <Sidebar />
        {page}
      </div>
    </Layout>
  );
};

export default Recommendations;
