import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/generic/layout';
import Sidebar from '../components/sidebar';
import Card from '../components/generic/card';
import House from '../components/dashboard/house';
import PageTitle from '../components/generic/pageTitle';
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

const Main = () => {
  const GlobalContext = useAppContext();
  const [queryParam, setQueryParam] = useState<string | null>(null);
  //type checking happens when this object is pacakged in above function, so any is fine here
  const [dashboardData, setDashboardData] = useState<any>();
  const [isQueryError, setIsQueryError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
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
    <>
      <div className="absolute min-w-[1150px] min-h-[755px] w-full pr-[30px] mt-4 text-logoGreen font-logoFont font-black text-[40px] text-right tracking-tight">
        GreenHouse
      </div>
      {dashboardData ? (
        <div className="w-full h-[100vh] min-w-[1150px] min-h-[755px] flex flex-col bg-slate-50 text-gray-500">
          <PageTitle
            title={'Dashboard'}
            subtitle={fullAddressString}
            onClick={() => setShowModal(true)}
          />

          <div className="h-full grid grid-cols-10 grid-rows-7 p-8 gap-4">
            <div className="flex flex-col row-start-1 row-end-7 col-start-1 col-end-6 gap-4">
              <FlippableCard
                disableHoverAnimation={true}
                showShadow={false}
                frontTitle="Overview"
                backTitle="Costs"
                front={
                  <div className="py-2 px-1 h-full">
                    <EpcChart data={dashboardData.Main} />
                  </div>
                }
                back={<CostSummary data={dashboardData.House.costs} />}
              />

              <FlippableCard
                disableHoverAnimation={true}
                showShadow={false}
                frontTitle="Energy Consumption"
                backTitle="Emissions"
                back={
                  <EnvironmentalSummary
                    data={dashboardData.House.consumptionEnvEff}
                  />
                }
                front={
                  <CarbonSummary data={dashboardData.House.environmental} />
                }
              />
            </div>

            <Card
              style={
                'relative pt-2 col-start-6 col-end-11 row-start-1 row-end-7 border'
              }
              disableHoverAnimation={true}
              showShadow={false}
              minDims={{ w: '440px', h: '566px' }}
            >
              <div className="flex justify-center h-full min-w-full">
                <House data={dashboardData.House} />
              </div>
            </Card>
          </div>

          {showModal ? (
            <Modal hideModal={() => setShowModal(false)}>
              <ExtraHouseInfo data={dashboardData.ExtraInfo} />
            </Modal>
          ) : null}
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
                    Opps, there was an error, try again later...
                  </h1>
                  <Lottie
                    loop
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
    </>
  );
};

Main.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Address Dashboard" footerFixed={false}>
      <div className="flex overflow-hidden shadow-xl">
        <Sidebar />
        {page}
      </div>
    </Layout>
  );
};

export default Main;
