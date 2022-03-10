import { useQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../components/generic/layout";
import RecCostSummary from "../components/recommendations/recCostSummary";
import RecCardGallery from "../components/recommendations/recsCardGallery";
import Modal from "../components/generic/modal";
import ExtraHouseInfo from "../components/dashboard/extraHouseInfo";
import { useAppContext } from "../context/state";
import { epcCertificateObject, epcRecommendationObject} from "../types";
import { GET_REC_DATA } from "./api/queries";
import loadingJson from "../assets/animations/animation/loading.json";
import errorJson from "../assets/animations/animation/error.json";
import Lottie from "react-lottie-player";
import DashboardWrapper from "../components/sidebarNew";

function paginateRecommendations(
  recs: Array<epcRecommendationObject>
): Array<Array<epcRecommendationObject>> {
  let recsPerPage = 3;
  let paginated: Array<Array<epcRecommendationObject>> = [[]];

  let test:any = []

  recs.forEach((elem) => {
    if (paginated[paginated.length - 1].length >= recsPerPage) {
      paginated.push([]);
    } 
    if (elem.improvementId) {
      //If improvementId is not present, then push to paginated, else do nothing
      if(!elem.completed) {
        paginated[paginated.length - 1].push(elem);
      }  else {
        test.push(elem)
      }
    }
  });
  console.log("test", test)
  console.log("paginated", paginated)
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
      <DashboardWrapper
        pageTitle="Dashboard"
        subTitle={address}
        setModalContent={setShowModal}
      >
        {recData && certificateData ? (
          <div className="flex flex-col bg-gray-100 text-gray-500">
            <RecCostSummary data={certificateData} />
            <RecCardGallery data={recData} />
            {showModal && extraHouseInfo ? (
              <Modal hideModal={() => setShowModal(false)}>
                <ExtraHouseInfo data={extraHouseInfo} />
              </Modal>
            ) : null}
          </div>
        ) : (
          <>
            {/*Loading Display*/}
            {loading ? (
              <div className="w-full flex flex-col justify-center items-center bg-gray-100">
                <h1 className="animate-fade text-3xl italic pb-2">
                  Loading...
                </h1>
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
                  <div className="w-full flex flex-col justify-center items-center bg-gray-100">
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
      </DashboardWrapper>
    </>
  );
};

Recommendations.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Address Dashboard">{page}</Layout>;
};

export default Recommendations;
