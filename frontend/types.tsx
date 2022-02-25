// Use this file to store frequently used types and interfaces and import them into components as needed.
// Types for specific component Props should still be defined in the component file itself.

export interface epcCertificateResponse extends Object {
  lowEnergyFixedLightCount: number;
  address: string;
  uprnSource: string;
  floorHeight: number;
  heatingCostPotential: number;
  unheatedCorridorLength: number;
  hotWaterCostPotential: number;
  constructionAgeBand: string;
  potentialEnergyRating: string;
  mainheatEnergyEff: string;
  windowsEnvEff: string;
  lightingEnergyEff: string;
  environmentImpactPotential: number;
  glazedType: string;
  heatingCostCurrent: number;
  address3: string;
  mainheatcontDescription: string;
  sheatingEnergyEff: string;
  propertyType: string;
  localAuthorityLabel: string;
  fixedLightingOutletsCount: number;
  energyTariff: string;
  mechanicalVentilation: string;
  hotWaterCostCurrent: number;
  county: string;
  postcode: string;
  solarWaterHeatingFlag: string;
  constituency: string;
  co2EmissionsPotential: number;
  numberHeatedRooms: number;
  floorDescription: string;
  energyConsumptionPotential: number;
  localAuthority: string;
  builtForm: string;
  numberOpenFireplaces: number;
  windowsDescription: string;
  glazedArea: string;
  inspectionDate: Date;
  mainsGasFlag: string;
  co2EmissCurrPerFloorArea: number;
  address1: string;
  heatLossCorridor: string;
  flatStoreyCount: string;
  constituencyLabel: string;
  roofEnergyEff: string;
  totalFloorArea: number;
  buildingReferenceNumber: string;
  environmentImpactCurrent: number;
  co2EmissionsCurrent: number;
  roofDescription: string;
  floorEnergyEff: string;
  numberHabitableRooms: number;
  address2: string;
  hotWaterEnvEff: string;
  posttown: string;
  mainheatcEnergyEff: string;
  mainFuel: string;
  lightingEnvEff: string;
  windowsEnergyEff: string;
  floorEnvEff: string;
  lightingDescription: string;
  roofEnvEff: string;
  wallsEnergyEff: string;
  photoSupply: string;
  lightingCostPotential: number;
  mainheatEnvEff: string;
  multiGlazeProportion: number;
  mainHeatingControls: number;
  lodgementDatetime: Date;
  flatTopStorey: string;
  currentEnergyRating: string;
  secondheatDescription: number;
  wallsEnvEff: string;
  transactionType: string;
  uprn: string;
  currentEnergyEfficiency: number;
  energyConsumptionCurrent: number;
  mainheatDescription: string;
  lightingCostCurrent: number;
  lodgementDate: Date;
  extensionCount: number;
  mainheatcEnvEff: string;
  lmkKey: string;
  windTurbineCount: number;
  tenure: string;
  floorLevel: string;
  potentialEnergyEfficiency: number;
  hotWaterEnergyEff: string;
  lowEnergyLighting: number;
  wallsDescription: string;
  hotwaterDescription: string;
}

export interface epcCertificateObject extends Object {
  ExtraInfo: {
    address: string;
    address2: string;
    address3: string;
    postcode: string;
    posttown: string;
    county: string;
    localAuthorityName: string;
    propertyType: string;
    builtForm: string;
    constructionAgeBand: string;
    totalFloorArea: number;
    energyTariff: string;
    floorLevel: string;
    flatStoreyCount: string;
    flatTopStorey: string;
    inspectionDate: Date;
  };
  Main: {
    currentEnergyEfficiency: number;
    potentialEnergyEfficiency: number;
    potentialEnergyRating: string;
    currentEnergyRating: string;
  };
  House: {
    environmental: {
      environmentImpactPotential: number;
      environmentImpactCurrent: number;
      energyConsumptionPotential: number;
      energyConsumptionCurrent: number;
      co2EmissionsCurrent: number;
      co2EmissionsPotential: number;
    };
    roof: {
      roofDescription: string;
      roofEnergyEff: string;
      roofEnvEff: string;
    };
    windows: {
      windowsDescription: string;
      windowsEnvEff: string;
      windowsEnergyEff: string;
      glazedType: string;
      glazedArea: string;
      multiGlazeProportion: number;
    };
    heating: {
      general: {
        mainsGasFlag: string;
        numberHeatedRooms: number;
        heatLossCorridor: string;
        unheatedCorridorLength: number;
        heatingCostPotential: number;
        heatingCostCurrent: number;
      };
      mainHeating: {
        mainHeatDescription: string;
        mainHeatEnvEff: string;
        mainHeatEnergyEff: string;
        mainFuel: string;
      };
      mainHeatingControls: {
        mainHeatControlDescription: string;
        mainHeatControlEnergyEff: string;
        mainHeatControlEnvEff: string;
      };
      secondaryHeating: {
        secondheatDescription: number;
        secondaryHeatingEnergyEff: string;
        //secondary heating environ efficiency is missing
      };
    };
    lighting: {
      lowEnergyLighting: number;
      lightingEnergyEff: string;
      lightingEnvEff: string;
      lightingCostPotential: number;
      lightingCostCurrent: number;
    };
    walls: {
      wallsDescription: string;
      wallsEnergyEff: string;
      wallsEnvEff: string;
    };
    water: {
      hotWaterDescription: string;
      hotWaterEnvEff: string;
      hotWaterEnergyEff: string;
      hotWaterCostPotential: number;
      hotWaterCostCurrent: number;
    };
    floor: {
      floorDescription: string;
      floorEnergyEff: string;
      floorEnvEff: string;
    };
    other: {
      photoSupply: string;
      solarWaterHeatingFlag: string;
      mechanicalVentilation: string;
    };
  };
}

export interface epcAnalyticsObject {
  meanCurrentEnergyEfficiency: number;
  meanCurrentEnvironmentImpact: number;
  meanCurrentEnergyConsumption: number;
  meanCurrentCo2Consumption: number;
  meanCurrentLightingCost: number;
  meanCurrentHeatingCost: number;
  meanCurrentHotWaterCost: number;
  meanPotentialEnergyEfficiency: number;
  meanPotentialEnvironmentImpact: number;
  meanPotentialEnergyConsumption: number;
  meanPotentialCo2Consumption: number;
  meanPotentialLightingCost: number;
  meanPotentialHeatingCost: number;
  meanPotentialHotWaterCost: number;
  normalisedCurrentEnergyEfficiency: Array<number>;
  normalisedCurrentEnvironmentImpact: Array<number>;
  normalisedCurrentEnergyConsumption: Array<number>;
  normalisedCurrentCo2Consumption: Array<number>;
  normalisedCurrentLightingCost: Array<number>;
  normalisedCurrentHeatingCost: Array<number>;
  normalisedCurrentHotWaterCost: Array<number>;
}

export interface epcRecommendationObject {
  lmkKey: string;
  improvementItem: number;
  indicativeCost: string;
  improvementSummaryText: string;
  improvementDescrText: string;
  improvementId: string;
  improvementIdText: string;
}

interface EPCDictionary<Value> {
  [id: string]: Value;
}

export const epcColorDictionary: EPCDictionary<string> = {
  A: "epcA",
  B: "epcB",
  C: "epcC",
  D: "epcD",
  E: "epcE",
  F: "epcF",
  G: "epcG",
};

export const epcIndexDictionary: EPCDictionary<number> = {
  A: 2,
  B: 3,
  C: 4,
  D: 5,
  E: 6,
  F: 7,
  G: 8,
};

export interface epcCertificateRecs {
  address: string;
  localAuthorityName: string;
  posttown: string;
  postcode: string;
  heatingCostPotential: number;
  heatingCostCurrent: number;
  lightingCostPotential: number;
  lightingCostCurrent: number;
  hotWaterCostPotential: number;
  hotWaterCostCurrent: number;
}
