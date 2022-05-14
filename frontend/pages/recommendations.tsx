import { useQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../components/generic/layout";
import RecCostSummary from "../components/recommendations/recCostSummary";
import RecCardGallery from "../components/recommendations/recsCardGallery";
import Modal from "../components/generic/modal";
import ExtraHouseInfo from "../components/dashboard/extraHouseInfo";
import { useAppContext } from "../context/state";
import {
  epcCertificateObject,
  epcRecommendationObject,
  localRecommendationObject,
} from "../types";
import { GET_REC_DATA } from "./api/queries";
import loadingJson from "../assets/animations/animation/loading.json";
import errorJson from "../assets/animations/animation/error.json";
import Lottie from "react-lottie-player";
import DashboardWrapper from "../components/sidebarNew";

const Recommendations = () => {
  const GlobalContext = useAppContext();
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [queryParam, setQueryParam] = useState<string | null>(null);
  const [isQueryError, setIsQueryError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [regionRecData, setRegionRecData] = useState<
    Array<localRecommendationObject>
  >([]);
  const [recData, setRecData] = useState<Array<epcRecommendationObject>>([]);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [address, setAddress] = useState<string>("");
  const [extraHouseInfo, setExtraHouseInfo] =
    useState<epcCertificateObject["ExtraInfo"]>();
  const [queryPostcode, setQueryPostcode] =
    useState<epcCertificateObject["ExtraInfo"]["postcode"]>();

  const { loading, error, data, refetch } = useQuery(GET_REC_DATA, {
    skip: !queryParam || !queryPostcode || isQueryError,
    variables: { queryParam, queryPostcode },
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
      setQueryPostcode(GlobalContext.extraHouseInfo.postcode);
    } else {
      let parsed = JSON.parse(localStorage.extraHouseInfo);
      setExtraHouseInfo(parsed);
      setQueryPostcode(parsed.postcode);
    }
  }, [GlobalContext.activeLmk, GlobalContext.extraHouseInfo]);

  useEffect(() => {
    if (data) {
      setRegionRecData(data.localRecommendations);
      setRecData(data.recommendations);
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

  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Set initial screen size on client size component mount
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  let mobileBreakpoint = 500;

  return (
    <>
      <DashboardWrapper
        pageTitle="Dashboard"
        subTitle={address}
        setModalContent={setShowModal}
        currentPage="Recommendations"
      >
        {recData && certificateData ? (
          <>
            <RecCostSummary data={certificateData} />
            <RecCardGallery
              data={recData}
              regionData={regionRecData}
              isMobile={screenWidth <= mobileBreakpoint}
            />
            {showModal && extraHouseInfo && (
              <Modal hideModal={() => setShowModal(false)}>
                <ExtraHouseInfo data={extraHouseInfo} />
              </Modal>
            )}
          </>
        ) : (
          <>
            {/*Loading Display*/}
            {loading ? (
              <div className="relative top-[30vh] w-full h-full flex flex-col justify-center items-center bg-gray-100">
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
                      Oops, there was an error, try again later...
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
