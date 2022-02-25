import React from 'react';
import Card from '../generic/card';
import Lottie from "react-lottie-player";
const StarRatings = require("react-star-ratings").default;
import json from "../../assets/animations/animation/up-arrow.json";
import { epcCertificateObject } from "../../types";

interface props {
    type: string;
    data: epcCertificateObject;
  }

export default function FeatureCard({ data, type }: props) {
  switch (type) {
    case "Walls":
      return (
        <Card
          style={"col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll"}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>
            <div className="text-2xl font-bold px-2 pb-1 border border-t-0 border-x-0">
              {type}
            </div>
            <div className="p-2 text-sm">
              <div className="pt-2 pb-3">
                <b>Description:</b>{" "}
                {data?.House.walls.wallsDescription
                  ? data.House.walls.wallsDescription
                  : "N/A"}
              </div>
              <div className="py-2 flex">
                <b className="pr-2">Energy Efficiency:</b>
                <StarRatings
                  rating={
                    data?.House.walls.wallsEnergyEff
                      ? data.House.walls.wallsEnergyEff
                      : 0
                  }
                  starRatedColor={
                    parseInt(data?.House.walls.wallsEnergyEff) > 2
                      ? "green"
                      : "red"
                  }
                  numberOfStars={5}
                  name="rating"
                  starDimension="15px"
                />
              </div>

              <div className="py-2 flex items-center">
                <b className="pr-2">Environmental Efficiency:</b>
                <StarRatings
                  rating={
                    data?.House.walls.wallsEnvEff
                      ? data.House.walls.wallsEnvEff
                      : 0
                  }
                  starRatedColor={
                    parseInt(data?.House.walls.wallsEnvEff) > 2
                      ? "green"
                      : "red"
                  }
                  numberOfStars={5}
                  name="rating"
                  starDimension="15px"
                />
              </div>
          </Card>
        )

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
        </Card>
      )


    case 'Lighting':
        return (
            <Card
            style={'col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll'}
            disableHoverAnimation={true}
            showShadow={true}
          >
            <div>
              <div className="text-xl font-bold p-2">{type}</div>
              <div className="p-2">
                <div className="py-2">
                  <b>Heat Loss Corridor:</b>{" "}
                  {data?.House.heating.general.heatLossCorridor
                    ? data?.House.heating.general.heatLossCorridor
                    : "N/A"}
                </div>
            </div>
          </Card>
        )

    case 'Heating':
        return (
            <Card
            style={'col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll'}
            disableHoverAnimation={true}
            showShadow={true}
            >
            <>
                <div>
                <div className='text-xl font-bold p-2'>{type}</div>
                <div className='p-2'>
                    <div className='py-2'><b>Heat Loss Corridor:</b> {data?.House.heating.general.heatLossCorridor ? data?.House.heating.general.heatLossCorridor : 'N/A'}</div>
                    <div className='py-2'><b>Heating Cost Current:</b> {data?.House.heating.general.heatingCostCurrent ? data?.House.heating.general.heatingCostCurrent : 'N/A'}</div>
                    <div className='py-2'><b>Heating Cost Potential:</b> {data?.House.lighting.lightingEnergyEff ? data?.House.lighting.lightingEnergyEff  : 'N/A'}</div>
                    <div className='py-2'><b>Main Gas Flag:</b> {data?.House.heating.general.mainsGasFlag ? data?.House.heating.general.mainsGasFlag : 'N/A'}</div>
                    <div className='py-2'><b>Number of Heated Rooms:</b> {data?.House.heating.general.numberHeatedRooms ? data?.House.heating.general.numberHeatedRooms : 'N/A'}</div>
                    <div className='py-2'><b>Unheated Corridor Length:</b> {data?.House.heating.general.unheatedCorridorLength ? data?.House.heating.general.unheatedCorridorLength : 'N/A'}</div>
                    <div>Main Heating</div>
                    <div className='py-2'><b>Main Fuel:</b> {data?.House.heating.mainHeating.mainFuel ? data?.House.heating.mainHeating.mainFuel : 'N/A'}</div>
                    <div className='py-2'><b>Main Heat Description:</b> {data?.House.heating.mainHeating.mainHeatDescription ? data?.House.heating.mainHeating.mainHeatDescription  : 'N/A'}</div>
                    <div className='py-2'><b>Main Heat Energy Efficiency:</b> {data?.House.heating.mainHeating.mainHeatEnergyEff ? data?.House.heating.mainHeating.mainHeatEnergyEff : 'N/A'}</div>
                    <div className='py-2'><b>Main Heat Environmental Efficiency:</b> {data?.House.heating.mainHeating.mainHeatEnvEff ? data?.House.heating.mainHeating.mainHeatEnvEff : 'N/A'}</div>
                
                    <div>Main Heating</div>
                    <div className='py-2'><b>Main :</b> {data?.House.heating.mainHeatingControls.mainHeatControlDescription ? data?.House.heating.mainHeatingControls.mainHeatControlDescription : 'N/A'}</div>
                    <div className='py-2'><b>mainHeatControlEnergyEff:</b> {data?.House.heating.mainHeatingControls.mainHeatControlEnergyEff? data?.House.heating.mainHeatingControls.mainHeatControlEnergyEff : 'N/A'}</div>
                    <div className='py-2'><b>mainHeatControlEnvEff:</b> {data?.House.heating.mainHeatingControls.mainHeatControlEnvEff ? data?.House.heating.mainHeatingControls.mainHeatControlEnvEff : 'N/A'}</div>
                    
                    <div>Main Heating</div>
                    <div className='py-2'><b>secondaryHeatingEnergyEff:</b> {data?.House.heating.secondaryHeating.secondaryHeatingEnergyEff ? data?.House.heating.secondaryHeating.secondaryHeatingEnergyEff : 'N/A'}</div>
                    <div className='py-2'><b>secondheatDescription:</b> {data?.House.heating.secondaryHeating.secondheatDescription? data?.House.heating.secondaryHeating.secondheatDescription : 'N/A'}</div>
                   
                </div>
                </div>
            </>
            </Card>
        )

                <div>Main Heating</div>
                <div className="py-2">
                  <b>secondaryHeatingEnergyEff:</b>{" "}
                  {data?.House.heating.secondaryHeating
                    .secondaryHeatingEnergyEff
                    ? data?.House.heating.secondaryHeating
                        .secondaryHeatingEnergyEff
                    : "N/A"}
                </div>
            </div>
          </Card>
        )

    case "Water":
      return (
        <Card
          style={"col-start-7 col-end-10 row-start-1 row-end-7 overflow-scroll"}
          disableHoverAnimation={true}
          showShadow={true}
        >
          <div>
            <div className="text-2xl font-bold px-2 pb-1 border border-t-0 border-x-0">
              {type}
            </div>
            <div className="p-2 text-sm">
              <div className="py-2">
                <b>Description:</b>{" "}
                {data?.House.water.hotWaterDescription
                  ? data?.House.water.hotWaterDescription
                  : "N/A"}
              </div>
              <div className="py-2">
                <b>Hot Water Cost Current:</b>{" "}
                {data?.House.water.hotWaterCostCurrent
                  ? data?.House.water.hotWaterCostCurrent
                  : "N/A"}
              </div>
              <div className="py-2">
                <b>Hot Water Cost Potential:</b>{" "}
                {data?.House.water.hotWaterCostPotential
                  ? data?.House.water.hotWaterCostPotential
                  : "N/A"}
              </div>

              <div className="py-2 flex">
                <b className="pr-2">Energy Efficiency:</b>
                <StarRatings
                  rating={
                    data?.House.water.hotWaterEnergyEff
                      ? data?.House.water.hotWaterEnergyEff
                      : 0
                  }
                  starRatedColor={
                    parseInt(data?.House.water.hotWaterEnergyEff) > 2
                      ? "green"
                      : "red"
                  }
                  numberOfStars={5}
                  name="rating"
                  starDimension="15px"
                />
              </div>
          </Card>
        )
      default:
        return (
            <Card
              style={'col-start-7 col-end-10 row-start-1 row-end-7'}
              disableHoverAnimation={true}
              showShadow={true}
            >
              <>
                <div>
                  <div className='text-xl text-center p-2 flex flex-col items-center justify-center'>
                    <Lottie
                      loop
                      animationData={json}
                      play
                      style={{height: '70px', width: '70px'}}
                    />
                    <p>Click On Your House To Find Out More!</p>
                  </div>
                </div>
              </>
            </Card>
          )

  }
}