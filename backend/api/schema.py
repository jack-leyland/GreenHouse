from graphene import (
    ObjectType,
    String,
    Schema,
    Field,
    List,
    Int,
    Float,
    Date,
    DateTime,
)
import requests
import json
import environ
import os
import pandas as pd
from datetime import datetime

from scripts.analysis import (
    metrics_to_numeric,
    current_metrics,
    potential_metrics,
    generate_normalised_data,
)

# Set the project base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

EPC_API_KEY = os.environ.get("EPC_API_KEY")

headers = {
    "Accept": "application/json",
    "Authorization": f"Basic {EPC_API_KEY}",
}

payload = {}


class Certificate(ObjectType):
    low_energy_fixed_light_count = Float()
    address = String()
    uprn_source = String()
    floor_height = Float()
    heating_cost_potential = Float()
    unheated_corridor_length = Float()
    hot_water_cost_potential = Float()
    construction_age_band = String()
    potential_energy_rating = String()
    mainheat_energy_eff = String()
    windows_env_eff = String()
    lighting_energy_eff = String()
    environment_impact_potential = Float()
    glazed_type = String()
    heating_cost_current = Float()
    address3 = String()
    mainheatcont_description = String()
    sheating_energy_eff = String()
    property_type = String()
    local_authority_label = String()
    fixed_lighting_outlets_count = Float()
    energy_tariff = String()
    mechanical_ventilation = String()
    hot_water_cost_current = Float()
    county = String()
    postcode = String()
    solar_water_heating_flag = String()
    constituency = String()
    co2_emissions_potential = Float()
    number_heated_rooms = Float()
    floor_description = String()
    energy_consumption_potential = Float()
    local_authority = String()
    built_form = String()
    number_open_fireplaces = Float()
    windows_description = String()
    glazed_area = String()
    inspection_date = Date()
    mains_gas_flag = String()
    co2_emiss_curr_per_floor_area = Float()
    address1 = String()
    heat_loss_corridor = String()
    flat_storey_count = String()
    constituency_label = String()
    roof_energy_eff = String()
    total_floor_area = Float()
    building_reference_number = String()
    environment_impact_current = Float()
    co2_emissions_current = Float()
    roof_description = String()
    floor_energy_eff = String()
    number_habitable_rooms = Float()
    address2 = String()
    hot_water_env_eff = String()
    posttown = String()
    mainheatc_energy_eff = String()
    main_fuel = String()
    lighting_env_eff = String()
    windows_energy_eff = String()
    floor_env_eff = String()
    lighting_description = String()
    roof_env_eff = String()
    walls_energy_eff = String()
    photo_supply = String()
    lighting_cost_potential = Float()
    mainheat_env_eff = String()
    multi_glaze_proportion = Float()
    main_heating_controls = Float()
    lodgement_datetime = DateTime()
    flat_top_storey = String()
    current_energy_rating = String()
    secondheat_description = Float()
    walls_env_eff = String()
    transaction_type = String()
    uprn = String()
    current_energy_efficiency = Float()
    energy_consumption_current = Float()
    mainheat_description = String()
    lighting_cost_current = Float()
    lodgement_date = Date()
    extension_count = Float()
    mainheatc_env_eff = String()
    lmk_key = String()
    wind_turbine_count = Float()
    tenure = String()
    floor_level = String()
    potential_energy_efficiency = Float()
    hot_water_energy_eff = String()
    low_energy_lighting = Float()
    walls_description = String()
    hotwater_description = String()


class Analytics(ObjectType):
    # average_energy_rating =  Char()
    average_current_energy_efficiency = Float()
    average_current_environment_impact = Float()
    average_current_energy_consumption = Float()
    average_current_co2_consumption = Float()
    average_current_lighting_cost = Float()
    average_current_heating_cost = Float()
    average_current_hot_water_cost = Float()
    average_potential_energy_efficiency = Float()
    average_potential_environment_impact = Float()
    average_potential_energy_consumption = Float()
    average_potential_co2_consumption = Float()
    average_potential_lighting_cost = Float()
    average_potential_heating_cost = Float()
    average_potential_hot_water_cost = Float()
    normalised_current_energy_efficiency = List(Float)
    normalised_current_environment_impact = List(Float)
    normalised_current_energy_consumption = List(Float)
    normalised_current_co2_consumption = List(Float)
    normalised_current_lighting_cost = List(Float)
    normalised_current_heating_cost = List(Float)
    normalised_current_hot_water_cost = List(Float)


class Address(ObjectType):
    lmk_key = String()
    address1 = String()
    address2 = String()
    address3 = String()
    postcode = String()
    building_reference_number = String()
    inspection_date = String()


class Recommendation(ObjectType):
    lmk_key = String()
    improvement_item = Int()
    indicative_cost = String()
    improvement_summary_text = String()
    improvement_descr_text = String()
    improvement_id = Int()
    improvement_id_text = String()


class Query(ObjectType):
    address = Field(Address, postcode=String(default_value="N/A"))
    recommendations = Field(List(Recommendation), lmk=String(default_value="N/A"))
    analytics = Field(Analytics, postcode=String(default_value="N/A"))
    certificate = Field(Certificate, lmk=String(default_value="N/A"))

    def resolve_analytics(root, info, postcode):
        page_size = 5000
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()
        local_df = pd.DataFrame(data=data["rows"], columns=data["column-names"])

        # Convert metrics to numbers to allow for calculations
        metrics_to_numeric(local_df, current_metrics)
        metrics_to_numeric(local_df, potential_metrics)
        metrics_to_numeric(local_df, ["total-floor-area"])
        generate_normalised_data(local_df, current_metrics, "total-floor-area")

        analytics = Analytics()
        analytics.average_current_energy_efficiency = local_df[
            "current-energy-efficiency"
        ].mean()
        analytics.average_current_environment_impact = local_df[
            "environment-impact-current"
        ].mean()
        analytics.average_current_energy_consumption = local_df[
            "energy-consumption-current"
        ].mean()
        analytics.average_current_co2_emissions = local_df[
            "co2-emissions-current"
        ].mean()
        analytics.average_current_lighting_cost = local_df[
            "lighting-cost-current"
        ].mean()
        analytics.average_current_heating_cost = local_df["heating-cost-current"].mean()
        analytics.average_current_hot_water_cost = local_df[
            "hot-water-cost-current"
        ].mean()
        analytics.average_potential_energy_efficiency = local_df[
            "potential-energy-efficiency"
        ].mean()
        analytics.average_potential_environment_impact = local_df[
            "environment-impact-potential"
        ].mean()
        analytics.average_potential_energy_consumption = local_df[
            "energy-consumption-potential"
        ].mean()
        analytics.average_potential_co2_consumption = local_df[
            "co2-emissions-potential"
        ].mean()
        analytics.average_potential_lighting_cost = local_df[
            "lighting-cost-potential"
        ].mean()
        analytics.average_potential_heating_cost = local_df[
            "heating-cost-potential"
        ].mean()
        analytics.average_potential_hot_water_cost = local_df[
            "hot-water-cost-potential"
        ].mean()
        analytics.normalised_current_energy_efficiency = local_df[
            "current-energy-efficiency-per-total-floor-area"
        ]
        analytics.normalised_current_environment_impact = local_df[
            "environment-impact-current-per-total-floor-area"
        ]
        analytics.normalised_current_energy_consumption = local_df[
            "energy-consumption-current-per-total-floor-area"
        ]
        analytics.normalised_current_co2_consumption = local_df[
            "current-energy-efficiency-per-total-floor-area"
        ]
        analytics.normalised_current_lighting_cost = local_df[
            "lighting-cost-current-per-total-floor-area"
        ]
        analytics.normalised_current_heating_cost = local_df[
            "heating-cost-current-per-total-floor-area"
        ]
        analytics.normalised_current_hot_water_cost = local_df[
            "hot-water-cost-current-per-total-floor-area"
        ]
        return analytics

    def resolve_address(root, info, postcode):
        page_size = 100
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"][0]
        address = Address()
        address.lmk_key = data["lmk-key"]
        address.address1 = data["address1"]
        address.address2 = data["address2"]
        address.address3 = data["address3"]
        address.postcode = data["postcode"]
        address.building_reference_number = data["building-reference-number"]
        address.inspection_date = data["inspection-date"]
        return address

    def resolve_certificate(root, info, lmk):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/certificate/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"][0]

        if not response:
            return {"Error": "Invalid LMK key"}

        certificate = Certificate()
        certificate.low_energy_fixed_light_count = data["low-energy-fixed-light-count"]
        certificate.address = data["address"]
        certificate.uprn_source = data["uprn-source"]
        certificate.floor_height = data["floor-height"]
        certificate.heating_cost_potential = data["heating-cost-potential"]
        certificate.unheated_corridor_length = data["unheated-corridor-length"]
        certificate.hot_water_cost_potential = data["hot-water-cost-potential"]
        certificate.construction_age_band = data["construction-age-band"]
        certificate.potential_energy_rating = data["potential-energy-rating"]
        certificate.mainheat_energy_eff = data["mainheat-energy-eff"]
        certificate.windows_env_eff = data["windows-env-eff"]
        certificate.lighting_energy_eff = data["lighting-energy-eff"]
        certificate.environment_impact_potential = data["environment-impact-potential"]
        certificate.glazed_type = data["glazed-type"]
        certificate.heating_cost_current = data["heating-cost-current"]
        certificate.address3 = data["address3"]
        certificate.mainheatcont_description = data["mainheatcont-description"]
        certificate.sheating_energy_eff = data["sheating-energy-eff"]
        certificate.property_type = data["property-type"]
        certificate.local_authority_label = data["local-authority-label"]
        certificate.fixed_lighting_outlets_count = data["fixed-lighting-outlets-count"]
        certificate.energy_tariff = data["energy-tariff"]
        certificate.mechanical_ventilation = data["mechanical-ventilation"]
        certificate.hot_water_cost_current = data["hot-water-cost-current"]
        certificate.county = data["county"]
        certificate.postcode = data["postcode"]
        certificate.solar_water_heating_flag = data["solar-water-heating-flag"]
        certificate.constituency = data["constituency"]
        certificate.co2_emissions_potential = data["co2-emissions-potential"]
        certificate.number_heated_rooms = data["number-heated-rooms"]
        certificate.floor_description = data["floor-description"]
        certificate.energy_consumption_potential = data["energy-consumption-potential"]
        certificate.local_authority = data["local-authority"]
        certificate.built_form = data["built-form"]
        certificate.number_open_fireplaces = data["number-open-fireplaces"]
        certificate.windows_description = data["windows-description"]
        certificate.glazed_area = data["glazed-area"]
        certificate.inspection_date = data["inspection-date"]
        certificate.mains_gas_flag = data["mains-gas-flag"]
        certificate.co2_emiss_curr_per_floor_area = data[
            "co2-emiss-curr-per-floor-area"
        ]
        certificate.address1 = data["address1"]
        certificate.heat_loss_corridor = data["heat-loss-corridor"]
        certificate.flat_storey_count = data["flat-storey-count"]
        certificate.constituency_label = data["constituency-label"]
        certificate.roof_energy_eff = data["roof-energy-eff"]
        certificate.total_floor_area = data["total-floor-area"]
        certificate.building_reference_number = data["building-reference-number"]
        certificate.environment_impact_current = data["environment-impact-current"]
        certificate.co2_emissions_current = data["co2-emissions-current"]
        certificate.roof_description = data["roof-description"]
        certificate.floor_energy_eff = data["floor-energy-eff"]
        certificate.number_habitable_rooms = data["number-habitable-rooms"]
        certificate.address2 = data["address2"]
        certificate.hot_water_env_eff = data["hot-water-env-eff"]
        certificate.posttown = data["posttown"]
        certificate.mainheatc_energy_eff = data["mainheatc-energy-eff"]
        certificate.main_fuel = data["main-fuel"]
        certificate.lighting_env_eff = data["lighting-env-eff"]
        certificate.windows_energy_eff = data["windows-energy-eff"]
        certificate.floor_env_eff = data["floor-env-eff"]
        certificate.sheating_env_eff = data["sheating-env-eff"]
        certificate.lighting_description = data["lighting-description"]
        certificate.roof_env_eff = data["roof-env-eff"]
        certificate.walls_energy_eff = data["walls-energy-eff"]
        certificate.photo_supply = data["photo-supply"]
        certificate.lighting_cost_potential = data["lighting-cost-potential"]
        certificate.mainheat_env_eff = data["mainheat-env-eff"]
        certificate.multi_glaze_proportion = data["multi-glaze-proportion"]
        certificate.main_heating_controls = data["main-heating-controls"]
        certificate.lodgement_datetime = data["lodgement-datetime"]
        certificate.flat_top_storey = data["flat-top-storey"]
        certificate.current_energy_rating = data["current-energy-rating"]
        certificate.secondheat_description = data["secondheat-description"]
        certificate.walls_env_eff = data["walls-env-eff"]
        certificate.transaction_type = data["transaction-type"]
        certificate.uprn = data["uprn"]
        certificate.current_energy_efficiency = data["current-energy-efficiency"]
        certificate.energy_consumption_current = data["energy-consumption-current"]
        certificate.mainheat_description = data["mainheat-description"]
        certificate.lighting_cost_current = data["lighting-cost-current"]
        certificate.lodgement_date = data["lodgement-date"]
        certificate.extension_count = data["extension-count"]
        certificate.mainheatc_env_eff = data["mainheatc-env-eff"]
        certificate.lmk_key = data["lmk-key"]
        certificate.wind_turbine_count = data["wind-turbine-count"]
        certificate.tenure = data["tenure"]
        certificate.floor_level = data["floor-level"]
        certificate.potential_energy_efficiency = data["potential-energy-efficiency"]
        certificate.hot_water_energy_eff = data["hot-water-energy-eff"]
        certificate.low_energy_lighting = data["low-energy-lighting"]
        certificate.walls_description = data["walls-description"]
        certificate.hotwater_description = data["hotwater-description"]
        return certificate

    def resolve_recommendations(root, info, lmk):
        url = (
            f"https://epc.opendatacommunities.org/api/v1/domestic/recommendations/{lmk}"
        )
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"]
        if not data:
            return {"Error": "Invalid LMK key"}
        recommendations = []
        for obj in data["rows"]:
            recommendation = Recommendation()
            recommendation.lmk_key = obj["lmk-key"]
            recommendation.improvement_item = obj["improvement-item"]
            recommendation.indicative_cost = obj["indicative-cost"]
            recommendation.improvement_summary_text = obj["improvement-summary-text"]
            recommendation.improvement_descr_text = obj["improvement-descr-text"]
            recommendation.improvement_id = obj["improvement-id"]
            recommendation.improvement_id_text = obj["improvement-id-text"]
            recommendations.append(recommendation)
        return recommendations


schema = Schema(query=Query)
