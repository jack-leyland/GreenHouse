import {gql} from '@apollo/client';
import type { epcCertificateObject } from '../../types';

export const GET_ADDRESSES = gql`
  query address($queryParam: String!) {
    address(postcode: $queryParam) {
      lmkKey
      address
    }
  }
`;

export const GET_CERTIFICATES = gql`
  query certificate($queryParam: String!) {
    certificate(lmk: $queryParam) {
      address
      address2
      address3
      localAuthorityLabel
      posttown
      county
      currentEnergyRating
      postcode
      potentialEnergyRating
      co2EmissionsCurrent
      co2EmissionsPotential
      co2EmissCurrPerFloorArea
      propertyType
      builtForm
      constructionAgeBand
      totalFloorArea
      energyTariff
      environmentImpactPotential
      environmentImpactCurrent
      energyConsumptionPotential
      energyConsumptionCurrent
      roofDescription
      roofEnergyEff
      roofEnvEff
      windowsDescription
      windowsEnvEff
      windowsEnergyEff
      glazedType
      glazedArea
      multiGlazeProportion
      mainsGasFlag
      numberHeatedRooms
      heatLossCorridor
      unheatedCorridorLength
      mainheatDescription
      mainheatEnvEff
      mainheatEnergyEff
      mainFuel
      mainheatcontDescription
      mainheatcEnergyEff
      mainheatcEnvEff
      secondheatDescription
      sheatingEnergyEff
      lowEnergyLighting
      lightingEnergyEff
      lightingEnvEff
      wallsDescription
      wallsEnergyEff
      wallsEnvEff
      hotwaterDescription
      hotWaterEnvEff
      hotWaterEnergyEff
      floorDescription
      floorEnergyEff
      floorEnvEff
      photoSupply
      solarWaterHeatingFlag
      mechanicalVentilation
      floorLevel
      flatStoreyCount
      flatTopStorey
      inspectionDate
      heatingCostPotential
      hotWaterCostPotential
      heatingCostCurrent
      hotWaterCostCurrent
      lightingCostPotential
      lightingCostCurrent
    }
  }
`;

// lowEnergyFixedLightCount
// address
// uprnSource
// floorHeight
// heatingCostPotential
// unheatedCorridorLength
// hotWaterCostPotential
// constructionAgeBand
// potentialEnergyRatingco2EmissCurrPerFloorArea
// mainheatEnergyEff
// windowsEnvEff
// lightingEnergyEff
// environmentImpactPotential
// glazedType
// heatingCostCurrent
// address3
// mainheatcontDescription
// sheatingEnergyEff
// propertyType
// localAuthorityLabel
// fixedLightingOutletsCount
// energyTariff
// mechanicalVentilation
// hotWaterCostCurrent
// county
// postcode
// solarWaterHeatingFlag
// constituency
// co2EmissionsPotential
// numberHeatedRooms
// floorDescription
// energyConsumptionPotential
// localAuthority
// builtForm
// numberOpenFireplaces
// windowsDescription
// glazedArea
// inspectionDate
// mainsGasFlag
// co2EmissCurrPerFloorArea
// address1
// heatLossCorridor
// flatStoreyCount
// constituencyLabel
// roofEnergyEff
// totalFloorArea
// buildingReferenceNumber
// environmentImpactCurrent
// co2EmissionsCurrent
// roofDescription
// floorEnergyEff
// numberHabitableRooms
// address2
// hotWaterEnvEff
// posttown
// mainheatcEnergyEff
// mainFuel
// lightingEnvEff
// windowsEnergyEff
// floorEnvEff
// lightingDescription
// roofEnvEff
// wallsEnergyEff
// photoSupply
// lightingCostPotential
// mainheatEnvEff
// multiGlazeProportion
// mainHeatingControls
// lodgementDatetime
// flatTopStorey
// currentEnergyRating
// secondheatDescription
// wallsEnvEff
// transactionType
// uprn
// currentEnergyEfficiency
// energyConsumptionCurrent
// mainheatDescription
// lightingCostCurrent
// lodgementDate
// extensionCount
// mainheatcEnvEff
// lmkKey
// windTurbineCount
// tenure
// floorLevel
// potentialEnergyEfficiency
// hotWaterEnergyEff
// lowEnergyLighting
// wallsDescription
// hotwaterDescription


export function buildCertificateQueryFromArray(queryParamArray: Array<string>) {
  if (!queryParamArray.length) {
    throw 'Query Builder expects non-empty object!';
  }
  let queryString = `
  query Certificate($queryParam: String!) {
    certificate(name: $queryParam) {
    `
  queryParamArray.forEach((param)=> {
    queryString.concat(param+'\n', queryString)
  })

  queryString.concat('\n'+'}'+'\n'+'}');

  return gql`$queryString`;

}