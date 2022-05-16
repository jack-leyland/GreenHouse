from graphene_django.utils.testing import GraphQLTestCase
from .schema import schema
import json


class QueryTestCase(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema
    GRAPHQL_URL = "/graphql"

    def test_address_query(self):
        response = self.query(
            """
            query address($postcode: String!) {
                address(postcode: $postcode) {
                    lmkKey
                    address
                }
            }
            """,
            variables={"postcode": "SW66TF"},
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)

    def test_certificate_query(self):
        response = self.query(
            """
            query certificate($lmk: String!) {
                certificate(lmk: $lmk) {
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
                    currentEnergyEfficiency
                    potentialEnergyEfficiency
                }
            }
            """,
            variables={
                "lmk": "03caacf3e712ce8428682340e06907fab1ed751090446397dc714a2fa3b4d571"
            },
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)

    def test_recommendations_query(self):
        response = self.query(
            """
            query recommendations($lmk: String!) {
                recommendations(lmk: $lmk) {
                    date
                    postcode
                    improvementId
                    improvementIdText
                    cost
                    completed
                    indicativeCost
                }
            }
            """,
            variables={
                "lmk": "03caacf3e712ce8428682340e06907fab1ed751090446397dc714a2fa3b4d571"
            },
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)

    def test_analytics_query(self):
        response = self.query(
            """
            query analytics($lmk: String!) {
                analytics(lmk: $lmk) {
                    meanCurrentEnergyEfficiency
                    meanCurrentEnergyRating
                    meanCurrentEnvironmentImpact
                    meanCurrentCo2Consumption
                    meanCurrentEnergyConsumption
                    meanCurrentHeatingCost
                    meanCurrentHotWaterCost
                    meanCurrentLightingCost
                    meanWallsEnergyEff
                    meanWallsEnvironmentalEff
                    meanRoofEnergyEff
                    meanRoofEnvironmentalEff
                    meanWaterEnergyEff
                    meanWaterEnvironmentalEff
                    meanMainHeatingEnergyEff
                    meanMainHeatingEnvironmentalEff
                    meanLightingEnergyEff
                    meanLightingEnvironmentalEff
                    meanFloorEnergyEff
                    meanFloorEnvironmentalEff
                    meanWindowsEnergyEff
                    meanWindowsEnvironmentalEff
                }
            }
            """,
            variables={
                "lmk": "03caacf3e712ce8428682340e06907fab1ed751090446397dc714a2fa3b4d571"
            },
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)

    def test_local_recommendations_query(self):
        response = self.query(
            """
            query recommendations($postcode: String!) {
                localRecommendations(postcode: $postcode) {
                    improvementId
                    averageCost
                    frequency
                }
            }
            """,
            variables={"postcode": "SW6 6TF"},
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
