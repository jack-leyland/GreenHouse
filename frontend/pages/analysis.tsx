import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import Layout from "../components/generic/layout";
import DashboardWrapper from "../components/sidebarNew";
import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { GET_BQ_DATA } from "./api/queries";
import { useQuery } from "@apollo/client";
import { BQBarData } from "../types";

const Main = () => {
  const [barData, setBarData] = useState<[BQBarData]>();
  const { loading, error, data } = useQuery(GET_BQ_DATA, {});

  useEffect(() => {
    if (data) {
      setBarData([
        {
          name: "analysis",
          lightingEng: data.bigQuery.averageAnnualChangeLightingEnergyEff,
          lightingEnv:
            data.bigQuery.averageAnnualChangeLightingEnvironmentalEff,
          wallsEng: data.bigQuery.averageAnnualChangeWallsEnergyEff,
          wallsEnv: data.bigQuery.averageAnnualChangeWallsEnvironmentalEff,
          waterEng: data.bigQuery.averageAnnualChangeWaterEnergyEff,
          waterEnv: data.bigQuery.averageAnnualChangeWaterEnvironmentalEff,
          floorEng: data.bigQuery.averageAnnualChangeFloorEnergyEff,
          floorEnv: data.bigQuery.averageAnnualChangeFloorEnvironmentalEff,
          roofEng: data.bigQuery.averageAnnualChangeRoofEnergyEff,
          roofEnv: data.bigQuery.averageAnnualChangeRoofEnvironmentalEff,
          heatingEng: data.bigQuery.averageAnnualChangeMainHeatingEnergyEff,
          heatingEnv:
            data.bigQuery.averageAnnualChangeMainHeatingEnvironmentalEff,
          heatingContEng:
            data.bigQuery.averageAnnualChangeMainHeatingControlsEnergyEff,
          heatingContEnv:
            data.bigQuery
              .averageAnnualChangeMainHeatingControlsEnvironmentalEff,
          heatingSecEng:
            data.bigQuery.averageAnnualChangeSecondHeatingEnergyEff,
          heatingSecEnv:
            data.bigQuery.averageAnnualChangeSecondHeatingEnvironmentalEff,
          windowsEng: data.bigQuery.averageAnnualChangeWindowsEnergyEff,
          windowsEnv: data.bigQuery.averageAnnualChangeWindowsEnvironmentalEff,
        },
      ]);
    }
  }, [data]);

  return (
    <DashboardWrapper
      pageTitle="Analysis"
      subTitle={""}
      setModalContent={""}
      currentPage="Analysis"
    >
      {barData ? (
        <BarChart
          layout="vertical"
          width={400}
          height={600}
          data={barData}
          barCategoryGap={5}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="lightingEng" fill="#19b45a" />
          <Bar dataKey="lightingEnv" fill="#19b45a" />
          <Bar dataKey="wallsEng" fill="#19b45a" />
          <Bar dataKey="wallsEnv" fill="#19b45a" />
          <Bar dataKey="waterEng" fill="#19b45a" />
          <Bar dataKey="waterEnv" fill="#19b45a" />
          <Bar dataKey="floorEng" fill="#19b45a" />
          <Bar dataKey="floorEnv" fill="#19b45a" />
          <Bar dataKey="roofEng" fill="#19b45a" />
          <Bar dataKey="roofEnv" fill="#19b45a" />
          <Bar dataKey="heatingEng" fill="#19b45a" />
          <Bar dataKey="heatingEnv" fill="#19b45a" />
          <Bar dataKey="heatingContEng" fill="#19b45a" />
          <Bar dataKey="heatingContEnv" fill="#19b45a" />
          <Bar dataKey="heatingSecEng" fill="#19b45a" />
          <Bar dataKey="heatingSecEnv" fill="#19b45a" />
          <Bar dataKey="windowsEng" fill="#19b45a" />
          <Bar dataKey="windowsEnv" fill="#19b45a" />
        </BarChart>
      ) : (
        <></>
      )}
    </DashboardWrapper>
  );
};

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Address Dashboard">{page}</Layout>;
};

export default Main;
