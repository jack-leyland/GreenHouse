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
import { useQuery } from '@apollo/client';
import type { epcCertificateObject, epcCertificateResponse } from '../types';
import { sendData } from 'next/dist/server/api-utils';

interface ColorDictionary<Value> {
  [id: string]: Value;
}

function packageDashboardDataByComponent(
  data: epcCertificateResponse
): epcCertificateObject {
  let componentPackagedData = {
    PageTitle: {
      address: data.address,
      address2: data.address2,
      address3: data.address3,
      postcode: data.postcode,
      posttown: data.posttown,
      county: data.county,
      localAuthorityName: data.localAuthorityLabel,
      propertyType: data.propertyType,
      builtForm: data.builtForm,
      constructionAgeBand: data.constructionAgeBand,
      totalFloorArea: data.totalFloorArea,
      energyTariff: data.energyTariff,
      floorLevel: data.floorLevel,
      flatStoreyCount: data.flatStoreyCount,
      flatTopStorey: data.flatTopStorey,
      inspectionDate: data.inspectionDate,
    },
    Main: {
      co2EmissionsCurrent: data.co2EmissionsCurrent,
      co2EmissionsPotential: data.co2EmissionsPotential,
      potentialEnergyRating: data.potentialEnergyRating,
      currentEnergyRating: data.currentEnergyRating,
    },
    House: {
      environmental: {
        environmentImpactPotential: data.environmentImpactPotential,
        environmentImpactCurrent: data.environmentImpactCurrent,
        energyConsumptionPotential: data.energyConsumptionPotential,
        energyConsumptionCurrent: data.energyConsumptionCurrent,
      },
      roof: {
        roofDescription: data.roofDescription,
        roofEnergyEff: data.roofEnergyEff,
        roofEnvEff: data.roofEnvEff,
      },
      windows: {
        windowsDescription: data.windowsDescription,
        windowsEnvEff: data.windowsEnvEff,
        windowsEnergyEff: data.windowsEnergyEff,
        glazedType: data.glazedType,
        glazedArea: data.glazedArea,
        multiGlazeProportion: data.multiGlazeProportion,
      },
      heating: {
        general: {
          mainsGasFlag: data.mainsGasFlag,
          numberHeatedRooms: data.numberHeatedRooms,
          heatLossCorridor: data.heatLossCorridor,
          unheatedCorridorLength: data.unheatedCorridorLength,
          heatingCostPotential: data.heatingCostPotential,
          heatingCostCurrent: data.heatingCostCurrent,
        },
        mainHeating: {
          mainHeatDescription: data.mainheatDescription,
          mainHeatEnvEff: data.mainheatEnvEff,
          mainHeatEnergyEff: data.mainheatEnergyEff,
          mainFuel: data.mainFuel,
        },
        mainHeatingControls: {
          mainHeatControlDescription: data.mainheatcontDescription,
          mainHeatControlEnergyEff: data.mainheatcEnergyEff,
          mainHeatControlEnvEff: data.mainheatcEnvEff,
        },
        secondaryHeating: {
          secondheatDescription: data.secondheatDescription,
          secondaryHeatingEnergyEff: data.sheatingEnergyEff,
          //secondary heating environ efficiency is missing
        },
      },
      lighting: {
        lowEnergyLighting: data.lowEnergyLighting,
        lightingEnergyEff: data.lightingEnergyEff,
        lightingEnvEff: data.lightingEnvEff,
        lightingCostPotential: data.lightingCostPotential,
        lightingCostCurrent: data.lightingCostCurrent,
      },
      walls: {
        wallsDescription: data.wallsDescription,
        wallsEnergyEff: data.wallsEnergyEff,
        wallsEnvEff: data.wallsEnvEff,
      },
      water: {
        hotWaterDescription: data.hotwaterDescription,
        hotWaterEnvEff: data.hotWaterEnvEff,
        hotWaterEnergyEff: data.hotWaterEnergyEff,
        hotWaterCostCurrent: data.hotWaterCostCurrent,
        hotWaterCostPotential: data.hotWaterCostPotential,
      },
      floor: {
        floorDescription: data.floorDescription,
        floorEnergyEff: data.floorEnergyEff,
        floorEnvEff: data.floorEnvEff,
      },
      other: {
        photoSupply: data.photoSupply,
        solarWaterHeatingFlag: data.solarWaterHeatingFlag,
        mechanicalVentilation: data.mechanicalVentilation,
      },
    },
  };

  return componentPackagedData;
}

const Main = () => {
  const GlobalContext = useAppContext();
  const [queryParam, setQueryParam] = useState<string | null>(null);
  //type checking happens when this object is pacakged in above function, so any is fine here
  const [dashboardData, setDashboardData] = useState<any>();
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
      let packagedData = packageDashboardDataByComponent(data.certificate);
      setDashboardData(packagedData);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsQueryError(true);
      console.log(error);
    }
  }, [error]);

  const epcColorDictionary: ColorDictionary<string> = {
    A: 'bg-epcA',
    B: 'bg-epcB',
    C: 'bg-epcC',
    D: 'bg-epcD',
    E: 'bg-epcE',
    F: 'bg-epcF',
    G: 'bg-epcG',
  };
  return (
    <>
      {dashboardData ? (
        <div className="w-full flex flex-col bg-slate-50 text-gray-500">
          <PageTitle title={'Overview'} data={dashboardData.PageTitle} />
          <div className="grid grid-cols-10 grid-rows-1 w-full h-1/10 p-6 gap-6 pr-12">
            <Card
              style={
                'col-start-1 col-end-3 row-start-1 text-white ' +
                epcColorDictionary[dashboardData.Main.currentEnergyRating]
              }
            >
              <div>
                <h3>Current Energy Rating</h3>
                <div className="p-2 font-bold text-3xl">
                  {dashboardData.Main.currentEnergyRating}
                </div>
              </div>
            </Card>
            <Card
              style={
                'col-start-3 col-end-5 row-start-1 text-white ' +
                epcColorDictionary[dashboardData.Main.potentialEnergyRating]
              }
            >
              <div>
                <h3>Potential Energy Rating</h3>
                <div className="p-2 font-bold text-3xl">
                  {dashboardData.Main.potentialEnergyRating}
                </div>
              </div>
            </Card>
            <Card style={'col-start-5 col-end-7 row-start-1'}>
              <div>
                <h3>Current C02 Emissions</h3>
                <div className="p-2 font-bold text-3xl">
                  {dashboardData.Main.co2EmissionsCurrent}
                </div>
              </div>
            </Card>
            <Card style={'col-start-7 col-end-9 row-start-1'}>
              <div>
                <h3>C02 Reduction Potential</h3>
                <div className="p-2 font-bold text-3xl">
                  {dashboardData.Main.co2EmissionsPotential}
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
