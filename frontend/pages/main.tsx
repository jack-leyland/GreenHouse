import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/generic/layout';
import Card from '../components/generic/card';
import House from '../components/dashboard/house';
import Lottie from 'react-lottie-player';
import { useAppContext } from '../context/state';
import loadingJson from '../assets/animations/animation/loading.json';
import errorJson from '../assets/animations/animation/error.json';
import { GET_CERTIFICATES } from './api/queries';
import { useQuery } from '@apollo/client';
import EpcChart from '../components/dashboard/epcChart';
import Modal from '../components/generic/modal';
import ExtraHouseInfo from '../components/dashboard/extraHouseInfo';
import CostSummary from '../components/dashboard/costSummary';
import EnvironmentalSummary from '../components/dashboard/environmentalSummary';
import CarbonSummary from '../components/dashboard/carbonSummary';
import FlippableCard from '../components/generic/flippableCard';
import packageDashboardDataByComponent from '../utils/packageDashboardDataByComponent';
import packageAnaylytics from '../utils/packageAnalytics';
import HelpModal from '../components/dashboard/helpModal';

import DashboardWrapper from '../components/sidebarNew';

const Main = () => {
  const GlobalContext = useAppContext();
  const [queryParam, setQueryParam] = useState<string | null>(null);
  //type checking happens when this object is pacakged in above function, so any is fine here
  const [dashboardData, setDashboardData] = useState<any>();
  const [analyticsData, setAnalyticsData] = useState<any>();
  const [isQueryError, setIsQueryError] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const { loading, error, data } = useQuery(GET_CERTIFICATES, {
    skip: !queryParam,
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
      let packagedData = packageDashboardDataByComponent(data.certificate);
      setDashboardData(packagedData);

      //Update/set extra house info cache for use on other pages,
      //may be better way to deal with this, but this'll do for now
      GlobalContext.setExtraHouseInfo(packagedData.ExtraInfo);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (data.analytics) {
        let analyticsData = packageAnaylytics(data.analytics);
        setAnalyticsData(analyticsData);
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsQueryError(true);
    }
  }, [error]);

  let fullAddressString = '';

  if (dashboardData) {
    let addressElements = [
      dashboardData.ExtraInfo.address,
      dashboardData.ExtraInfo.localAuthorityName,
      dashboardData.ExtraInfo.posttown,
      dashboardData.ExtraInfo.postcode,
    ];
    fullAddressString = addressElements.join(', ');
  }

  return (
    <DashboardWrapper pageTitle="Dashboard" subTitle={fullAddressString}>
      {dashboardData ? (
        <div className="h-screen flex flex-col text-gray-600">
          <div className="h-full flex lg:flex-row flex-col px-2 py-8 w-full gap-4">
            <div className="flex flex-col lg:w-1/2 lg:h-2/3 gap-4 h-full">
              <FlippableCard
                disableHoverAnimation={true}
                showShadow={false}
                frontTitle="Overview"
                backTitle="Costs"
                front={
                  <div className="py-2 px-1 h-full">
                    <EpcChart
                      data={dashboardData.Main}
                      analytics={analyticsData.main}
                      setModalHandler={setModalContent}
                    />
                  </div>
                }
                back={
                  <CostSummary
                    data={dashboardData.House.costs}
                    analytics={analyticsData.cost}
                    setModalHandler={setModalContent}
                  />
                }
              />

              <FlippableCard
                disableHoverAnimation={true}
                showShadow={false}
                frontTitle="Emissions"
                backTitle="Energy Consumption"
                front={
                  <CarbonSummary
                    data={dashboardData.House.environmental}
                    analytics={analyticsData.environmental}
                    setModalHandler={setModalContent}
                  />
                }
                back={
                  <EnvironmentalSummary
                    data={dashboardData.House.consumptionEnvEff}
                    setModalHandler={setModalContent}
                  />
                }
              />
            </div>

            <Card
              style={'lg:w-1/2 w-full lg:h-2/3 border'}
              disableHoverAnimation={true}
              showShadow={false}
            >
              <div className="flex justify-center h-full min-w-full">
                <House
                  data={dashboardData.House}
                  analytics={analyticsData.house}
                  setModalHandler={setModalContent}
                />
              </div>
            </Card>
          </div>

          {modalContent !== '' ? (
            <Modal hideModal={() => setModalContent('')}>
              <>
                {modalContent === 'address' ? (
                  <ExtraHouseInfo data={dashboardData.ExtraInfo} />
                ) : null}
                {<HelpModal type={modalContent} />}
              </>
            </Modal>
          ) : null}
        </div>
      ) : (
        <>
          {/*Loading Display*/}
          {loading ? (
            <div className="w-full flex flex-col justify-center items-center bg-white">
              <h1 className="animate-fade text-3xl text-gray-800 italic pb-2">
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
                <div className="w-full flex flex-col justify-center items-center bg-white">
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
  );
};

Main.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Address Dashboard">
        {page}
     </Layout>
  );
};

export default Main;
