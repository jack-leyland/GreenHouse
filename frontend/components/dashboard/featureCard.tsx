import React from "react";
import Card from "../generic/card";
import Lottie from "react-lottie-player";
import json from "../../assets/animations/animation/up-arrow.json";
import StarRating from "../generic/starRating";
import { epcCertificateObject } from "../../types";

interface props {
  type: string;
  data: epcCertificateObject['House'];
}

export default function FeatureCard({ data, type }: props) {
  switch (type) {
    case 'Walls':
      return (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>
            <div className="text-2xl font-bold px-2 pb-1 border border-t-0 border-x-0">
              {type}
            </div>
            <div className="p-2 text-sm">
              <div className="pt-2 pb-3">
                <b>Description:</b>{' '}
                {data?.walls.wallsDescription
                  ? data.walls.wallsDescription
                  : 'N/A'}
              </div>
              <StarRating
                title={"Energy Efficiency"}
                rating={
                  data?.walls.wallsEnergyEff
                    ? parseInt(data?.walls.wallsEnergyEff)
                    : 0
                }
                areaAverage={0}
              />
              <StarRating
                title={"Environmental Efficiency"}
                rating={
                  data?.consumptionEnvEff.wallsEnvEff
                    ? parseInt(data?.consumptionEnvEff.wallsEnvEff)
                    : 0
                }
                areaAverage={0}
              />
            </div>
          </div>
        </Card>
      );

    case 'Roof':
      return (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>
            <div className="text-2xl font-bold px-2 pb-1 border border-t-0 border-x-0">
              {type}
            </div>
            <div className="p-2 text-sm">
              <div className="py-2">
                <b>Description:</b>{' '}
                {data?.roof.roofDescription ? data.roof.roofDescription : 'N/A'}
              </div>
              <StarRating
                title={"Energy Efficiency"}
                rating={
                  data?.roof.roofEnergyEff
                    ? parseInt(data?.roof.roofEnergyEff)
                    : 0
                }
                areaAverage={0}
              />
              <StarRating
                title={"Environmental Efficiency"}
                rating={
                  data?.consumptionEnvEff.roofEnvEff
                    ? parseInt(data?.consumptionEnvEff.roofEnvEff)
                    : 0
                }
                areaAverage={0}
              />
            </div>
          </div>
        </Card>
      );

    case 'Floor':
      return (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>
            <div className="text-2xl font-bold px-2 pb-1 border border-t-0 border-x-0">
              {type}
            </div>
            <div className="p-2 text-sm">
              <div className="py-2">
                <b>Description:</b>{' '}
                {data?.floor.floorDescription
                  ? data.floor.floorDescription
                  : 'N/A'}
              </div>
              <StarRating
                title={"Energy Efficiency"}
                rating={
                  data?.floor.floorEnergyEff
                    ? parseInt(data?.floor.floorEnergyEff)
                    : 0
                }
                areaAverage={0}
              />
              <StarRating
                title={"Environmental Efficiency"}
                rating={
                  data?.consumptionEnvEff.floorEnvEff
                    ? parseInt(data?.consumptionEnvEff.floorEnvEff)
                    : 0
                }
                areaAverage={0}
              />
            </div>
          </div>
        </Card>
      );

    case 'Lighting':
      return (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>
            <div className="text-2xl font-bold px-2 pb-1 border border-t-0 border-x-0">
              {type}
            </div>
            <div className="p-2 text-sm">
              <div className="py-2">
                <b>Lighting Cost Current:</b>{' '}
                {data?.costs.lightingCostCurrent
                  ? data?.costs.lightingCostCurrent
                  : 'N/A'}
              </div>
              <div className="py-2">
                <b>Lighting Cost Potential:</b>{' '}
                {data?.costs.lightingCostPotential
                  ? data?.costs.lightingCostPotential
                  : 'N/A'}
              </div>
              <div className="py-2">
                <b>Low Energy Lighting:</b>{' '}
                {data?.lighting.lowEnergyLighting
                  ? data?.lighting.lowEnergyLighting
                  : 'N/A'}
              </div>
              <StarRating
                title={"Energy Efficiency"}
                rating={
                  data?.lighting.lightingEnergyEff
                    ? parseInt(data?.lighting.lightingEnergyEff)
                    : 0
                }
                areaAverage={0}
              />
              <StarRating
                title={"Environmental Efficiency"}
                rating={
                  data?.consumptionEnvEff.lightingEnvEff
                    ? parseInt(data?.consumptionEnvEff.lightingEnvEff)
                    : 0
                }
                areaAverage={0}
              />
            </div>
          </div>
        </Card>
      );

    case 'Heating':
      return (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <>
            <div>
              <div className="text-xl font-bold p-2">{type}</div>
              <div className="p-2">
                <div className="py-2">
                  <b>Heat Loss Corridor:</b>{' '}
                  {data?.heating.general.heatLossCorridor
                    ? data?.heating.general.heatLossCorridor
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>Heating Cost Current:</b>{' '}
                  {data?.costs.heatingCostCurrent
                    ? data?.costs.heatingCostCurrent
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>Heating Cost Potential:</b>{' '}
                  {data?.lighting.lightingEnergyEff
                    ? data?.lighting.lightingEnergyEff
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>Main Gas Flag:</b>{' '}
                  {data?.heating.general.mainsGasFlag
                    ? data?.heating.general.mainsGasFlag
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>Number of Heated Rooms:</b>{' '}
                  {data?.heating.general.numberHeatedRooms
                    ? data?.heating.general.numberHeatedRooms
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>Unheated Corridor Length:</b>{' '}
                  {data?.heating.general.unheatedCorridorLength
                    ? data?.heating.general.unheatedCorridorLength
                    : 'N/A'}
                </div>
                <div>Main Heating</div>
                <div className="py-2">
                  <b>Main Fuel:</b>{' '}
                  {data?.heating.mainHeating.mainFuel
                    ? data?.heating.mainHeating.mainFuel
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>Main Heat Description:</b>{' '}
                  {data?.heating.mainHeating.mainHeatDescription
                    ? data?.heating.mainHeating.mainHeatDescription
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>Main Heat Energy Efficiency:</b>{' '}
                  {data?.heating.mainHeating.mainHeatEnergyEff
                    ? data?.heating.mainHeating.mainHeatEnergyEff
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>Main Heat Environmental Efficiency:</b>{' '}
                  {data?.consumptionEnvEff.mainHeatEnvEff
                    ? data?.consumptionEnvEff.mainHeatEnvEff
                    : 'N/A'}
                </div>

                <div>Main Heating</div>
                <div className="py-2">
                  <b>Main :</b>{' '}
                  {data?.heating.mainHeatingControls.mainHeatControlDescription
                    ? data?.heating.mainHeatingControls
                        .mainHeatControlDescription
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>mainHeatControlEnergyEff:</b>{' '}
                  {data?.heating.mainHeatingControls.mainHeatControlEnergyEff
                    ? data?.heating.mainHeatingControls.mainHeatControlEnergyEff
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>mainHeatControlEnvEff:</b>{' '}
                  {data?.consumptionEnvEff.mainHeatControlEnvEff
                    ? data?.consumptionEnvEff.mainHeatControlEnvEff
                    : 'N/A'}
                </div>

                <div>Main Heating</div>
                <div className="py-2">
                  <b>secondaryHeatingEnergyEff:</b>{' '}
                  {data?.heating.secondaryHeating.secondaryHeatingEnergyEff
                    ? data?.heating.secondaryHeating.secondaryHeatingEnergyEff
                    : 'N/A'}
                </div>
                <div className="py-2">
                  <b>secondheatDescription:</b>{' '}
                  {data?.heating.secondaryHeating.secondheatDescription
                    ? data?.heating.secondaryHeating.secondheatDescription
                    : 'N/A'}
                </div>
              </div>
            </div>
          </>
        </Card>
      );

    case 'Water':
      return (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>
            <div className="text-2xl font-bold px-2 pb-1 border border-t-0 border-x-0">
              {type}
            </div>
            <div className="p-2 text-sm">
              <div className="py-2">
                <b>Description:</b>{' '}
                {data?.water.hotWaterDescription
                  ? data?.water.hotWaterDescription
                  : 'N/A'}
              </div>
              <div className="py-2">
                <b>Hot Water Cost Current:</b>{' '}
                {data?.costs.hotWaterCostCurrent
                  ? data?.costs.hotWaterCostCurrent
                  : 'N/A'}
              </div>
              <div className="py-2">
                <b>Hot Water Cost Potential:</b>{' '}
                {data?.costs.hotWaterCostPotential
                  ? data?.costs.hotWaterCostPotential
                  : 'N/A'}
              </div>

              <StarRating
                title={"Energy Efficiency"}
                rating={
                  data?.water.hotWaterEnergyEff
                    ? parseInt(data?.water.hotWaterEnergyEff)
                    : 0
                }
                areaAverage={0}
              />
              <StarRating
                title={"Environmental Efficiency"}
                rating={
                  data?.consumptionEnvEff.hotWaterEnvEff
                    ? parseInt(data?.consumptionEnvEff.hotWaterEnvEff)
                    : 0
                }
                areaAverage={0}
              />
            </div>
          </div>
        </Card>
      );

    case 'Windows':
      return (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>
            <div className="text-2xl font-bold px-2 pb-1 border border-t-0 border-x-0">
              {type}
            </div>
            <div className="p-2 text-sm">
              <div className="py-2">
                <b>Description:</b>{' '}
                {data?.windows.windowsDescription
                  ? data?.windows.windowsDescription
                  : 'N/A'}
              </div>

              <div className="py-2">
                <b>Glazed Area: </b>{' '}
                {data?.windows.glazedArea ? data?.windows.glazedArea : 'N/A'}
              </div>
              <div className="py-2">
                <b>Glazed Type: </b>{' '}
                {data?.windows.glazedType ? data?.windows.glazedType : 'N/A'}
              </div>
              <div className="py-2">
                <b>Multi Glaze Proportion: </b>{' '}
                {data?.windows.multiGlazeProportion
                  ? data?.windows.multiGlazeProportion
                  : 'N/A'}
              </div>

              <StarRating
                title={"Energy Efficiency"}
                rating={
                  data?.windows.windowsEnergyEff
                    ? parseInt(data?.windows.windowsEnergyEff)
                    : 0
                }
                areaAverage={0}
              />
              <StarRating
                title={"Environmental Efficiency"}
                rating={
                  data?.consumptionEnvEff.windowsEnvEff
                    ? parseInt(data?.consumptionEnvEff.windowsEnvEff)
                    : 0
                }
                areaAverage={0}
              />
            </div>
          </div>
        </Card>
      );
    default:
      return (
        <Card
          style={'col-start-7 col-end-10 row-start-1 row-end-7'}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <>
            <div>
              <div className="text-xl text-center p-2 flex flex-col items-center justify-center">
                <Lottie
                  loop
                  animationData={json}
                  play
                  style={{ height: '70px', width: '70px' }}
                />
                <p>Click On Your House To Find Out More!</p>
              </div>
            </div>
          </>
        </Card>
      );
  }
}
