import type { epcAnalyticsObject, packagedAnalyticsObject } from '../types';

export default function packageAnaylytics(
    data: epcAnalyticsObject
  ): packagedAnalyticsObject {
    let packagedAnalytics = {
        meanCurrentEnergyConsumption: data.meanCurrentEnergyConsumption,
        cost: {
            meanCurrentHeatingCost: data.meanCurrentHeatingCost,
            meanCurrentHotWaterCost: data.meanCurrentHotWaterCost,
            meanCurrentLightingCost: data.meanCurrentLightingCost
        },
        floor: {
            meanFloorEnergyEff: data.meanFloorEnergyEff,
            meanFloorEnvironmentalEff: data.meanFloorEnvironmentalEff
        },
        lighting: {
            meanLightingEnergyEff: data.meanLightingEnergyEff,
            meanLightingEnvironmentalEff: data.meanLightingEnvironmentalEff

        },
        heating: {
            meanMainHeatingEnergyEff: data.meanMainHeatingEnergyEff,
            meanMainHeatingEnvironmentalEff: data.meanMainHeatingEnvironmentalEff
        },
        water: {
            meanWaterEnergyEff: data.meanWaterEnergyEff,
            meanWaterEnvironmentalEff: data.meanWaterEnvironmentalEff
        },
        roof: {
            meanRoofEnergyEff: data.meanRoofEnergyEff,
            meanRoofEnvironmentalEff: data.meanRoofEnvironmentalEff
        },
        walls: {
            meanWallsEnvironmentalEff: data.meanWallsEnvironmentalEff,
            meanWaterEnergyEff: data.meanWaterEnergyEff
        },
        windows: {
            meanWindowsEnergyEff: data.meanWindowsEnergyEff,
            meanWindowsEnvironmentalEff: data.meanWindowsEnvironmentalEff
        }
      }
    return packagedAnalytics;
  }