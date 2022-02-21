import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import House from "../components/house";
import PageTitle from "../components/pageTitle";
import Lottie from "react-lottie-player";
import { useAppContext } from "../context/state";
import loadingJson from "../public/assets/animation/loading.json";
import errorJson from "../public/assets/animation/error.json";
import { GET_CERTIFICATES } from "./api/queries";
import { useQuery } from "@apollo/client";
import type { epcCertificateObject, epcCertificateResponse } from "../types";
import EpcChart from "../components/epcChart";
import Modal from "../components/modal";
import ExtraHouseInfo from "../components/extraHouseInfo";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ChartContainer from "../components/chartContainer";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BsFillTreeFill } from "react-icons/bs";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";

function packageDashboardDataByComponent(
  data: epcCertificateResponse
): epcCertificateObject {
  let componentPackagedData = {
    ExtraInfo: {
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
      potentialEnergyRating: data.potentialEnergyRating,
      currentEnergyRating: data.currentEnergyRating,
      currentEnergyEfficiency: data.currentEnergyEfficiency,
      potentialEnergyEfficiency: data.potentialEnergyEfficiency,
    },
    House: {
      environmental: {
        environmentImpactPotential: data.environmentImpactPotential,
        environmentImpactCurrent: data.environmentImpactCurrent,
        energyConsumptionPotential: data.energyConsumptionPotential,
        energyConsumptionCurrent: data.energyConsumptionCurrent,
        co2EmissionsCurrent: data.co2EmissionsCurrent,
        co2EmissionsPotential: data.co2EmissionsPotential,
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const { loading, error, data } = useQuery(GET_CERTIFICATES, {
    skip: !queryParam,
    variables: { queryParam },
  });
  const [environmentalSummaryActive, setEnvironmentalSummaryActive] =
    useState<boolean>(false);

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

  let fullAddressString = "";
  if (dashboardData) {
    let addressElements = [
      dashboardData.ExtraInfo.address,
      dashboardData.ExtraInfo.localAuthorityName,
      dashboardData.ExtraInfo.posttown,
      dashboardData.ExtraInfo.postcode,
    ];
    fullAddressString = addressElements.join(", ");
  }

  const data1 = [
    {
      name: "C02 Production",
      Current: 3000,
      Potential: 1398,
    },
  ];

  console.log(data);

  return (
    <>
      {dashboardData ? (
        <div className="w-full flex flex-col bg-slate-50 text-gray-500">
          <PageTitle
            title={"Dashboard"}
            subtitle={fullAddressString}
            onClick={() => setShowModal(true)}
          />

          <div className="h-full grid grid-cols-10 grid-rows-7 p-8 gap-4">
            <div className="flex flex-col row-start-1 row-end-7 col-start-1 col-end-6 gap-4">
              <Card
                style={"border"}
                disableHoverAnimation={true}
                showShadow={false}
              >
                <div className="h-full">
                  <h3 className="text-xl font-bold px-1 pb-1 border border-t-0 border-x-0 flex justify-between items-center">
                    Overview <MdOutlineFlipCameraAndroid size={25} />{" "}
                  </h3>
                  <div className="py-2 px-1 h-full">
                    <EpcChart
                      currentEfficiency={
                        dashboardData.Main.currentEnergyEfficiency
                      }
                      potentialEfficiency={
                        dashboardData.Main.potentialEnergyEfficiency
                      }
                    />
                  </div>
                </div>
              </Card>

              <Card
                style={"border"}
                disableHoverAnimation={true}
                showShadow={false}
              >
                <div className="h-full">
                  <h3 className="text-xl font-bold px-2 pt-1 pb-1 border border-t-0 border-x-0">
                    Environmental
                  </h3>
                  <div className="py-2 px-1 h-full">
                    <div className="flex h-3/4">
                      <div className="w-5/12">
                        <div className="flex items-center mx-1">
                          <span className="mr-2">Carbon Production</span>
                          <AiFillQuestionCircle size={10} />
                        </div>
                        <div className="h-full flex justify-center items-center pt-4">
                          <BarChart
                            layout="horizontal"
                            width={150}
                            height={175}
                            data={data1}
                          >
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis type="category" dataKey="name" />
                            <Tooltip />
                            <Bar dataKey="Current" fill="#e9153b" />
                            <Bar dataKey="Potential" fill="#19b45a" />
                          </BarChart>
                        </div>
                      </div>

                      <div className="w-7/12 border border-r-0 border-y-0">
                        <div className="pb-1 underline text-sm px-4">
                          How you compare:
                        </div>
                        <div>
                          <div className="px-4 py-1">
                            <div className="py-1">
                              You are in the bottom/top % of emitters in your
                              area, and emit ... less/more than the average U.K.
                              household
                            </div>
                            <div className="py-2 font-bold">
                              Your current emsssions are equilvalent to:
                            </div>
                            <div className="flex">
                              <span>
                                <BsFillTreeFill />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card
              style={
                "relative pt-2 col-start-6 col-end-11 row-start-1 row-end-7 border"
              }
              disableHoverAnimation={true}
              showShadow={false}
            >
              <div className="flex justify-center h-full w-full">
                <House data={dashboardData} />
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
