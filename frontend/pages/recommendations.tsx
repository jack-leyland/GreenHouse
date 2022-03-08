import { useQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../components/generic/layout";
import PageTitle from "../components/generic/pageTitle";
import Sidebar from "../components/sidebar";
import RecCostSummary from "../components/recommendations/recCostSummary";
import RecCardGallery from "../components/recommendations/recCardGallery";
import Modal from "../components/generic/modal";
import ExtraHouseInfo from "../components/dashboard/extraHouseInfo";
import { useAppContext } from "../context/state";
import { epcCertificateObject, epcRecommendationObject } from "../types";
import { GET_REC_DATA } from "./api/queries";
import loadingJson from "../assets/animations/animation/loading.json";
import errorJson from "../assets/animations/animation/error.json";
import Lottie from "react-lottie-player";

function paginateRecommendations(
  recs: Array<epcRecommendationObject>
): Array<Array<epcRecommendationObject>> {
  let recsPerPage = 3;
  let paginated: Array<Array<epcRecommendationObject>> = [[]];

  recs.forEach((elem) => {
    if (paginated[paginated.length - 1].length < recsPerPage) {
      if (elem.improvementId) {
        paginated[paginated.length - 1].push(elem);
      }
    } else {
      if (elem.improvementId) {
        paginated.push([]);
        paginated[paginated.length - 1].push(elem);
      }
    }
  });
  return paginated;
}

const Recommendations = () => {
  const GlobalContext = useAppContext();
  const [queryParam, setQueryParam] = useState<string | null>(null);
  const [isQueryError, setIsQueryError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [recData, setRecData] = useState<Array<Array<epcRecommendationObject>>>(
    [[]]
  );
  const [certificateData, setCertificateData] = useState<any>(null);
  const [address, setAddress] = useState<string>("");
  const [extraHouseInfo, setExtraHouseInfo] =
    useState<epcCertificateObject["ExtraInfo"]>();

  const { loading, error, data } = useQuery(GET_REC_DATA, {
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

    if (GlobalContext.extraHouseInfo) {
      setExtraHouseInfo(GlobalContext.extraHouseInfo);
    } else {
      setExtraHouseInfo(JSON.parse(localStorage.extraHouseInfo));
    }
  }, [GlobalContext.activeLmk, GlobalContext.extraHouseInfo]);

  useEffect(() => {
    if (data) {
      setRecData(paginateRecommendations(data.recommendations));
      setCertificateData(data.certificate);
    }
  }, [data]);

  // If we have time we should just cache this since it is used across pages
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

  useEffect(() => {
    if (error) {
      setIsQueryError(true);
    }
  }, [error]);

  return (
    <>
      {recData && certificateData ? (
        <div className="w-full flex flex-col bg-slate-50 text-gray-500 min-w-[1150px] min-h-[755px]">
          <PageTitle
            title={"Recommendations"}
            subtitle={address}
            onClick={() => setShowModal(true)}
          />
          <RecCostSummary data={certificateData} />
          <RecCardGallery data={recData} />
        </div>
      ) : (
        <>
          {/*Loading Display*/}
          {loading ? (
            <div className="w-full flex flex-col justify-center items-center bg-slate-50">
              <h1 className="animate-fade text-3xl italic pb-2">Loading...</h1>
              <Lottie
                loop
                animationData={loadingJson}
                play
                style={{ width: 250, height: 250 }}
              />
            </div>
          ) : (
            <>
              {/*Error Display*/}
              {isQueryError && !data ? (
                <div className="w-full flex flex-col justify-center items-center bg-slate-50">
                  <h1 className="animate-fade text-3xl font-bold pb-2">
                    Oops, there was an error, try again later... [Dev Note:
                    Query Error]
                  </h1>
                  <Lottie
                    animationData={errorJson}
                    play
                    style={{ width: 150, height: 150 }}
                  />
                </div>
              ) : null}
            </>
          )}
        </>
      )}
      {showModal && extraHouseInfo ? (
        <Modal hideModal={() => setShowModal(false)}>
          <ExtraHouseInfo data={extraHouseInfo} />
        </Modal>
      ) : null}
    </>
  );
};

Recommendations.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Address Dashboard">
      <div className="flex overflow-hidden shadow-xl">
        <Sidebar />
        {page}
      </div>
    </Layout>
  );
};

export default Recommendations;
