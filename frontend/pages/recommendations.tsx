import { gql, useQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";
import Card from "../components/card";
import Layout from "../components/layout";
import PageTitle from "../components/pageTitle";
import Sidebar from "../components/sidebar";
import { useAppContext } from "../context/state";
import { epcRecommendationObject } from "../types";

const GET_RECOMMENDATIONS = gql`
  query recommendations($queryParam: String!) {
    recommendations(lmk: $queryParam) {
      lmkKey
      indicativeCost
      improvementIdText
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
  }, []);

  useEffect(() => {
    if (data) {
      setQueryData(data.recommendations);
    }
  }, [data]);

  return (
    <>
      <div className="w-full flex flex-col bg-slate-50 text-gray-500">
        <div className="h-full grid grid-cols-10 grid-rows-6 p-8 gap-4">
          {queryData.map((item, key) => {
            return (
              <Card
                key={key}
                style={"col-start-1 col-end-7"}
                disableHoverAnimation={true}
                showShadow={true}
              >
                <h3>{item.improvementIdText}</h3>

                <h3>{item.indicativeCost}</h3>
              </Card>
            );
          })}
        </div>
      </div>
    </>
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
