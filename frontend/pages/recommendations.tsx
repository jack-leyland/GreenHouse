import { gql, useQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";
import Card from "../components/generic/card";
import Layout from "../components/generic/layout";
import PageTitle from "../components/generic/pageTitle";
import Sidebar from "../components/sidebar";
import Recommendation from "../components/recommendationCard";
import { useAppContext } from "../context/state";
import { epcCertificateRecs, epcRecommendationObject } from "../types";

const GET_DATA = gql`
  query get_data($queryParam: String!) {
    recommendations(lmk: $queryParam) {
      lmkKey
      indicativeCost
      improvementIdText
      improvementItem
      improvementId
    }
    certificate(lmk: $queryParam) {
      address
      posttown
      postcode
      heatingCostPotential
      heatingCostCurrent
      lightingCostPotential
      lightingCostCurrent
      hotWaterCostPotential
      hotWaterCostCurrent
    }
  }
`;

const Recommendations = () => {
  const GlobalContext = useAppContext();
  const [queryParam, setQueryParam] = useState<string | null>(null);
  const [isQueryError, setIsQueryError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [recData, setRecData] = useState<Array<epcRecommendationObject>>([]);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [address, setAddress] = useState<string>("");

  const { loading, error, data } = useQuery(GET_DATA, {
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
      setRecData(data.recommendations);
      setCertificateData(data.certificate);
    }
  }, [data]);

  useEffect(() => {
    if (certificateData) {
      let addressElements = [
        certificateData.address,
        certificateData.posttown,
        certificateData.postcode,
      ];
      setAddress(addressElements.join(", "));
    }
  }, [certificateData]);

  return (
    <>
      <div className="w-full flex flex-col bg-slate-50 text-gray-500">
        <PageTitle
          title={"Recommendations"}
          subtitle={address}
          onClick={() => setShowModal(true)}
        />
        <div className="p-6">
          <Card
            style={"w-full flex flex-col"}
            disableHoverAnimation={true}
            showShadow={false}
          >
            <div className="grid grid-cols-4 grid-rows-4 gap-1">
              <div className="col-start-1 col-end-3 row-start-1 row-end-1 text-sm tracking-widest title-font mb-1 font-bold">
                <span className="bg-yellow-500 pr-5 mr-5"></span>
                Total Savings from Lighting Improvements
              </div>
              <div className="col-start-3 col-end-3 row-start-1 row-end-1 text-sm tracking-widest title-font mb-1 font-bold">
                <p>
                  £
                  {certificateData.lightingCostCurrent -
                    certificateData.lightingCostPotential}{" "}
                  per year
                </p>
              </div>

              <div className="col-start-1 col-end-3 row-start-2 row-end-2 text-sm tracking-widest title-font mb-1 font-bold">
                <span className="bg-red-500 pr-5 mr-5"></span>
                Total Savings from Heating Improvements
              </div>
              <div className="col-start-3 col-end-3 row-start-2 row-end-2 text-sm tracking-widest title-font mb-1 font-bold">
                <p>
                  £
                  {certificateData.heatingCostCurrent -
                    certificateData.heatingCostPotential}{" "}
                  per year
                </p>
              </div>

              <div className="col-start-1 col-end-3 row-start-3 row-end-3 text-sm tracking-widest title-font mb-1 font-bold">
                <span className="bg-blue-500 pr-5 mr-5"></span>
                Total Savings from Water Improvements
              </div>
              <div className="col-start-3 col-end-3 row-start-3 row-end-3 text-sm tracking-widest title-font mb-1 font-bold">
                <p>
                  £
                  {certificateData.hotWaterCostCurrent -
                    certificateData.hotWaterCostPotential}{" "}
                  per year
                </p>
              </div>

              <div className="col-start-1 col-end-3 row-start-4 row-end-4 text-sm tracking-widest title-font mb-1 font-bold">
                <span className="bg-slate-500 pr-5 mr-5"></span>
                Other Improvements
              </div>
            </div>
          </Card>
        </div>
        <section className="text-gray-600 body-font overflow-hidden h-1/2">
          <div className="container px-5 mx-auto flex flex-row overflow-x-scroll flex-nowrap h-full">
            {recData.map((item: epcRecommendationObject, key: number) => {
              return <Recommendation recs={item} key={key} />;
            })}
          </div>
        </section>
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
