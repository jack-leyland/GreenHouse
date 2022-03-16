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
    costs: {
      heatingCostPotential: number;
      heatingCostCurrent: number;
      hotWaterCostPotential: number;
      hotWaterCostCurrent: number;
      lightingCostPotential: number;
      lightingCostCurrent: number;
    };
    consumptionEnvEff: {
      energyConsumptionPotential: number;
      energyConsumptionCurrent: number;
      windowsEnvEff: string;
      roofEnvEff: string;
      mainHeatEnvEff: string;
      mainHeatControlEnvEff: string;
      lightingEnvEff: string;
      wallsEnvEff: string;
      floorEnvEff: string;
      hotWaterEnvEff: string;
    };
    environmental: {
      environmentImpactPotential: number;
      environmentImpactCurrent: number;
      co2EmissionsCurrent: number;
      co2EmissionsPotential: number;
    };
    roof: {
      roofDescription: string;
      roofEnergyEff: string;
    };
    windows: {
      windowsDescription: string;
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
      };
      mainHeating: {
        mainHeatDescription: string;
        mainHeatEnergyEff: string;
        mainFuel: string;
      };
      mainHeatingControls: {
        mainHeatControlDescription: string;
        mainHeatControlEnergyEff: string;
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
    };
    walls: {
      wallsDescription: string;
      wallsEnergyEff: string;
    };
    water: {
      hotWaterDescription: string;
      hotWaterEnergyEff: string;
    };
    floor: {
      floorDescription: string;
      floorEnergyEff: string;
    };
    other: {
      photoSupply: string;
      solarWaterHeatingFlag: string;
      mechanicalVentilation: string;
    };
  };
}

export interface epcAnalyticsObject {
  meanCurrentEnergyRating: string;
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
  meanFloorEnergyEff: number;
  meanFloorEnvironmentalEff: number;
  meanLightingEnergyEff: number;
  meanLightingEnvironmentalEff: number;
  meanMainHeatingEnergyEff: number;
  meanMainHeatingEnvironmentalEff: number;
  meanRoofEnergyEff: number;
  meanRoofEnvironmentalEff: number;
  meanWallsEnergyEff: number;
  meanWallsEnvironmentalEff: number;
  meanWaterEnergyEff: number;
  meanWaterEnvironmentalEff: number;
  meanWindowsEnergyEff: number;
  meanWindowsEnvironmentalEff: number;
}

export interface packagedAnalyticsObject {
  main: {
    meanCurrentEnergyEfficiency: number;
    meanCurrentEnergyRating: string;
  };
  environmental: {
    meanCurrentEnergyConsumption: number;
    meanCurrentEnvironmentImpact: number;
    meanCurrentCo2Consumption: number;
  };
  cost: {
    meanCurrentHeatingCost: number;
    meanCurrentHotWaterCost: number;
    meanCurrentLightingCost: number;
  };
  house: {
    floor: {
      meanFloorEnergyEff: number;
      meanFloorEnvironmentalEff: number;
    };
    lighting: {
      meanLightingEnergyEff: number;
      meanLightingEnvironmentalEff: number;
    };
    heating: {
      meanMainHeatingEnergyEff: number;
      meanMainHeatingEnvironmentalEff: number;
    };
    water: {
      meanWaterEnergyEff: number;
      meanWaterEnvironmentalEff: number;
    };
    roof: {
      meanRoofEnergyEff: number;
      meanRoofEnvironmentalEff: number;
    };
    walls: {
      meanWallsEnvironmentalEff: number;
      meanWallsEnergyEff: number;
    };
    windows: {
      meanWindowsEnergyEff: number;
      meanWindowsEnvironmentalEff: number;
    };
  };
}

export interface epcRecommendationObject {
  lmkKey: string;
  improvementItem: number;
  indicativeCost: string;
  improvementSummaryText: string;
  improvementDescrText: string;
  improvementId: string;
  improvementIdText: string;
  date: string;
  cost: number;
  postcode: string;
  completed: boolean;
}

export interface localRecommendationObject {
  frequency: number;
  averageCost: number;
  improvementId: string;
}

export interface EPCDictionary<Value> {
  [id: string]: Value;
}

export const HeatingCategories: EPCDictionary<string> = {
  1: 'Water',
  2: 'Water',
  3: 'Water',
  4: 'Water',
  5: 'Heating',
  6: 'Heating',
  7: 'Heating',
  8: 'Heating',
  9: 'Heating',
  10: 'Heating',
  13: 'Heating',
  14: 'Heating',
  16: 'Heating',
  19: 'Water',
  20: 'Water',
  23: 'Heating',
  24: 'Heating',
  25: 'Heating',
  26: 'Heating',
  27: 'Heating',
  28: 'Heating',
  31: 'Heating',
  34: 'Other',
  35: 'Lighting',
  36: 'Heating',
  37: 'Heating',
  40: 'Heating',
  44: 'Other',
  45: 'Heating',
  46: 'Heating',
  47: 'Heating',
  48: 'Other',
  49: 'Water',
  50: 'Heating',
  56: 'Heating',
  57: 'Heating',
  58: 'Heating',
  59: 'Heating',
  62: 'Heating',
  63: 'Heating',
};

export const epcColorDictionary: EPCDictionary<string> = {
  A: 'epcA',
  B: 'epcB',
  C: 'epcC',
  D: 'epcD',
  E: 'epcE',
  F: 'epcF',
  G: 'epcG',
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

export const starColors: EPCDictionary<string> = {
  1: 'rgb(239 68 68)',
  2: 'rgb(249 115 22)',
  3: 'rgb(234 179 8)',
  4: 'rgb(132 204 22)',
  5: 'rgb(34 197 94)',
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
