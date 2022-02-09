import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import Card from '../components/card';
import House from '../components/house';
import PageTitle from '../components/pageTitle';
import Lottie from 'react-lottie-player';
import { useAppContext } from '../context/state';
import loadingJson from '../public/assets/animation/loading.json';
import errorJson from '../public/assets/animation/error.json';
import { GET_CERTIFICATES } from './api/queries';
import { gql, useQuery } from '@apollo/client';
import type { epcCertificateObject } from '../types';
import { sendData } from 'next/dist/server/api-utils';

const Main = () => {
  const GlobalContext = useAppContext();
  const [queryParam, setQueryParam] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<epcCertificateObject>();
  const [isQueryError, setIsQueryError] = useState<boolean>(false);
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
      setDashboardData(data.certificate);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsQueryError(true);
      console.log(error);
    }
  }, [error]);

  interface ColorDictionary<Value> {
    [id: string]: Value;
  }
  const epcColorDictionary: ColorDictionary<string> = {
    A: 'bg-epcA',
    B: 'bg-epcB',
    C: 'bg-epcC',
    D: 'bg-epcD',
    E: 'bg-epcE',
    F: 'bg-epcF',
    G: 'bg-epcG',
  };
  //   {/*style={
  //   'col-start-1 col-end-3 text-white ' +
  //   epcColorDictionary[epcData['current-energy-rating']]
  // }*/}

  // style={
  //   'col-start-3 col-end-5 text-white ' +
  //   epcColorDictionary[epcData['potential-energy-rating']]
  // }
  //subtitle={epcData['address']
  console.log(dashboardData);
  return (
    <>
      {dashboardData ? (
        <div className="w-full flex flex-col bg-slate-50 text-gray-500">
          <PageTitle
            title={'Overview'}
            subtitle={dashboardData.address}
            postcode={dashboardData.postcode}
          />
          <div className="grid grid-cols-10 grid-rows-1 w-full h-1/10 p-6 gap-6 pr-12">
            <Card
              style={
                'col-start-1 col-end-3 row-start-1 text-white ' +
                epcColorDictionary[dashboardData.currentEnergyRating]
              }
            >
              <div>
                <h3>Current Energy Rating</h3>
                <div className="p-2 font-bold text-3xl">
                  {dashboardData.currentEnergyRating}
                </div>
              </div>
            </Card>

            <Card
              style={
                'col-start-3 col-end-5 row-start-1 text-white ' +
                epcColorDictionary[dashboardData.potentialEnergyRating]
              }
            >
              <div>
                <h3>Potential Energy Rating</h3>
                <div className="p-2 font-bold text-3xl">
                  {dashboardData.potentialEnergyRating}
                </div>
              </div>
            </Card>
            <Card style={'col-start-5 col-end-7 row-start-1'}>
              <div>
                <h3>Current C02 Emissions</h3>
                <div className="p-2 font-bold text-3xl">
                  {dashboardData.co2EmissionsCurrent}
                </div>
              </div>
            </Card>
            <Card style={'col-start-7 col-end-9 row-start-1'}>
              <div>
                <h3>C02 Reduction Potential</h3>
                <div className="p-2 font-bold text-3xl">
                  {dashboardData.co2EmissionsPotential}
                </div>
              </div>
            </Card>
          </div>
          <div className="ml-9">Your House</div>
          <House />
        </div>
      ) : (
        <>
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
