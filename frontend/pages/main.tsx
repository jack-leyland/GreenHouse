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

import { gql, useQuery } from '@apollo/client';

const GET_CERTIFICATES = gql`
  query Certificate($queryParam: String!) {
    certificate(name: $queryParam)
  }
`;

const Main = () => {
  const GlobalContext = useAppContext();
  const [queryParam, setQueryParam] = useState<string | null>(null);
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

  //TODO: wrap in useEffect?
  let epcData;
  if (data) {
    epcData = JSON.parse(data.certificate);
  }

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

  console.log(data);

  return (
    <>
      {!data ? (
        <div className="w-full flex flex-col bg-slate-50 text-gray-500">
          <PageTitle title={'Overview'} subtitle={"Test"} />
          <div className="grid grid-cols-10 grid-rows-1 w-full h-1/10 p-6 gap-6 pr-12">
            <Card
              style={
                'col-start-1 col-end-3 text-white'
              }
            >
              <div>
                <h3>Current Energy Rating</h3>
                <div className="p-2 font-bold text-3xl">
                  {/*epcData['current-energy-rating']*/}
                </div>
              </div>
            </Card>

            <Card
              style={
                'col-start-3 col-end-5 text-white'
              }
            >
              <div>
                <h3>Potential Energy Rating</h3>
                <div className="p-2 font-bold text-3xl">
                  {/*epcData['potential-energy-rating']*/}
                </div>
              </div>
            </Card>
            <Card style={'col-start-5 col-end-7'}>
              <div>
                <h3>Current C02 Emissions</h3>
                <div className="p-2 font-bold text-3xl">
                  {/*epcData['co2-emissions-current']*/}
                </div>
              </div>
            </Card>
            <Card style={'col-start-7 col-end-9'}>
              <div>
                <h3>C02 Reduction Potential</h3>
                <div className="p-2 font-bold text-3xl">
                  {/*epcData['co2-emissions-potential']*/}
                </div>
              </div>
            </Card>
            </div>
            
            <div>Your House</div>
            <House/>
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
              {error && !data ? (
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
