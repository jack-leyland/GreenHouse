import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import Card from '../components/card';
import PageTitle from '../components/pageTitle';
import Lottie from 'react-lottie-player';
import { useAppContext } from '../context/state';
import loadingJson from '../public/assets/animation/loading.json';
import errorJson from '../public/assets/animation/error.json';
import {
  BarChart,
  XAxis,
  Tooltip,
  Bar,
  Pie,
  PieChart,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarGrid,
  Legend,
  PolarRadiusAxis,
} from 'recharts';
import ChartContainer from '../components/chartContainer';

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

  //For testing charts
  const barData = [
    {
      Walls: 200,
      Floors: 100,
    },
  ];
  const barData2 = [
    {
      Walls: 200,
      Floors: 100,
      Windows: 250,
    },
  ];
  const pieData = [
    {
      name: 'Group A',
      value: 400,
    },
    {
      name: 'Group B',
      value: 300,
    },
    {
      name: 'Group C',
      value: 300,
    },
    {
      name: 'Group D',
      value: 200,
    },
    {
      name: 'Group E',
      value: 278,
    },
    {
      name: 'Group F',
      value: 189,
    },
  ];

  const radarData = [
    {
      Feature: 'Floor',
      house: 80,
      fullMark: 100,
    },
    {
      Feature: 'Walls',
      house: 60,
      fullMark: 100,
    },
    {
      Feature: 'Roof',
      house: 40,
      fullMark: 100,
    },
    {
      Feature: 'Windows',
      house: 80,
      fullMark: 100,
    },
    {
      Feature: 'Heating',
      house: 40,
      fullMark: 100,
    },
    {
      Feature: 'Water',
      house: 60,
      fullMark: 100,
    },
  ];

  return (
    <>
      {data ? (
        <div className="w-full flex flex-col bg-slate-50 text-gray-500">
          <PageTitle title={'Overview'} subtitle={epcData['address']} />
          <div className="grid grid-cols-10 grid-rows-5 w-full h-full p-6 gap-6 pr-12">
            <Card
              style={
                'col-start-1 col-end-3 text-white ' +
                epcColorDictionary[epcData['current-energy-rating']]
              }
            >
              <div>
                <h3>Current Energy Rating</h3>
                <div className="p-2 font-bold text-3xl">
                  {epcData['current-energy-rating']}
                </div>
              </div>
            </Card>

            <Card
              style={
                'col-start-3 col-end-5 text-white ' +
                epcColorDictionary[epcData['potential-energy-rating']]
              }
            >
              <div>
                <h3>Potential Energy Rating</h3>
                <div className="p-2 font-bold text-3xl">
                  {epcData['potential-energy-rating']}
                </div>
              </div>
            </Card>
            <Card style={'col-start-5 col-end-7'}>
              <div>
                <h3>Current C02 Emissions</h3>
                <div className="p-2 font-bold text-3xl">
                  {epcData['co2-emissions-current']}
                </div>
              </div>
            </Card>
            <Card style={'col-start-7 col-end-9'}>
              <div>
                <h3>C02 Reduction Potential</h3>
                <div className="p-2 font-bold text-3xl">
                  {epcData['co2-emissions-potential']}
                </div>
              </div>
            </Card>

            <Card style={'col-start-1 col-end-6 row-start-2 row-end-4'}>
              <>
                <h3>Your House</h3>
                <ChartContainer>
                  <RadarChart
                    outerRadius={90}
                    width={730}
                    height={250}
                    data={radarData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="Feature" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="House"
                      dataKey="house"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ChartContainer>
              </>
            </Card>

            <Card style={'col-start-6 col-end-11 row-start-2 row-end-4'}>
              <div>
                <h3>Map</h3>
              </div>
            </Card>

            <Card style={'col-start-1 col-end-4 row-start-4 row-end-6'}>
              <>
                <h3>Spending</h3>
                <ChartContainer>
                  <BarChart width={350} height={350} data={barData}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="Walls" fill="#8884d8" />
                    <Bar dataKey="Floors" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </>
            </Card>

            <Card style={'col-start-4 col-end-7 row-start-4 row-end-6'}>
              <>
                <h3>C02 Production</h3>
                <ChartContainer>
                  <PieChart width={730} height={250}>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      fill="#8884d8"
                      label
                    />
                  </PieChart>
                </ChartContainer>
              </>
            </Card>

            <Card style={'col-start-7 col-end-10 row-start-4 row-end-6'}>
              <>
                <h3>Potential Savings</h3>
                <ChartContainer>
                  <BarChart width={350} height={350} data={barData2}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="Walls" fill="#8884d8" />
                    <Bar dataKey="Floors" fill="#82ca9d" />
                    <Bar dataKey="Windows" fill="#85cb6d" />
                  </BarChart>
                </ChartContainer>
              </>
            </Card>
          </div>
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
