import type { epcCertificateObject, epcCertificateResponse } from '../types';

export default function packageDashboardDataByComponent(
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
        costs: {
          heatingCostPotential: data.heatingCostPotential,
          heatingCostCurrent: data.heatingCostCurrent,
          lightingCostPotential: data.lightingCostPotential,
          lightingCostCurrent: data.lightingCostCurrent,
          hotWaterCostCurrent: data.hotWaterCostCurrent,
          hotWaterCostPotential: data.hotWaterCostPotential,
        },
        consumptionEnvEff: {
          energyConsumptionPotential: data.energyConsumptionPotential,
          energyConsumptionCurrent: data.energyConsumptionCurrent,
          roofEnvEff: data.roofEnvEff,
          lightingEnvEff: data.lightingEnvEff,
          wallsEnvEff: data.wallsEnvEff,
          floorEnvEff: data.floorEnvEff,
          mainHeatEnvEff: data.mainheatEnvEff,
          windowsEnvEff: data.windowsEnvEff,
          mainHeatControlEnvEff: data.mainheatcEnvEff,
          hotWaterEnvEff: data.hotWaterEnvEff,
        },
        environmental: {
          environmentImpactPotential: data.environmentImpactPotential,
          environmentImpactCurrent: data.environmentImpactCurrent,
          co2EmissionsCurrent: data.co2EmissionsCurrent,
          co2EmissionsPotential: data.co2EmissionsPotential,
        },
        roof: {
          roofDescription: data.roofDescription,
          roofEnergyEff: data.roofEnergyEff,
        },
        windows: {
          windowsDescription: data.windowsDescription,
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
          },
          mainHeating: {
            mainHeatDescription: data.mainheatDescription,
            mainHeatEnergyEff: data.mainheatEnergyEff,
            mainFuel: data.mainFuel,
          },
          mainHeatingControls: {
            mainHeatControlDescription: data.mainheatcontDescription,
            mainHeatControlEnergyEff: data.mainheatcEnergyEff,
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
        },
        walls: {
          wallsDescription: data.wallsDescription,
          wallsEnergyEff: data.wallsEnergyEff,
        },
        water: {
          hotWaterDescription: data.hotwaterDescription,
          hotWaterEnergyEff: data.hotWaterEnergyEff,
        },
        floor: {
          floorDescription: data.floorDescription,
          floorEnergyEff: data.floorEnergyEff,
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