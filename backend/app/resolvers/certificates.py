from app.types import Certificate
from scripts.analysis import verify_number

from datetime import datetime


convert_efficiency = {
    "": None,
    "N/A": None,
    "NO DATA!": None,
    "Very Poor": 1,
    "Poor": 2,
    "Average": 3,
    "Good": 4,
    "Very Good": 5,
}


def create_certificate(data):
    certificate = Certificate()
    certificate.low_energy_fixed_light_count = verify_number(
        data["low-energy-fixed-light-count"]
    )
    certificate.address = data["address"]
    certificate.uprn_source = data["uprn-source"]
    certificate.floor_height = verify_number(data["floor-height"])
    certificate.heating_cost_potential = verify_number(data["heating-cost-potential"])
    certificate.unheated_corridor_length = verify_number(
        data["unheated-corridor-length"]
    )
    certificate.hot_water_cost_potential = verify_number(
        data["hot-water-cost-potential"]
    )
    certificate.construction_age_band = data["construction-age-band"]
    certificate.potential_energy_rating = data["potential-energy-rating"]
    certificate.mainheat_energy_eff = convert_efficiency[data["mainheat-energy-eff"]]
    certificate.windows_env_eff = convert_efficiency[data["windows-env-eff"]]
    certificate.lighting_energy_eff = convert_efficiency[data["lighting-energy-eff"]]
    certificate.environment_impact_potential = verify_number(
        data["environment-impact-potential"]
    )
    certificate.glazed_type = data["glazed-type"]
    certificate.heating_cost_current = verify_number(data["heating-cost-current"])
    certificate.address3 = data["address3"]
    certificate.mainheatcont_description = data["mainheatcont-description"]
    certificate.sheating_energy_eff = convert_efficiency[data["sheating-energy-eff"]]
    certificate.property_type = data["property-type"]
    certificate.local_authority_label = data["local-authority-label"]
    certificate.fixed_lighting_outlets_count = verify_number(
        data["fixed-lighting-outlets-count"]
    )
    certificate.energy_tariff = data["energy-tariff"]
    certificate.mechanical_ventilation = data["mechanical-ventilation"]
    certificate.hot_water_cost_current = verify_number(data["hot-water-cost-current"])
    certificate.county = data["county"]
    certificate.postcode = data["postcode"]
    certificate.solar_water_heating_flag = data["solar-water-heating-flag"]
    certificate.constituency = data["constituency"]
    certificate.co2_emissions_potential = verify_number(data["co2-emissions-potential"])
    certificate.number_heated_rooms = verify_number(data["number-heated-rooms"])
    certificate.floor_description = data["floor-description"]
    certificate.energy_consumption_potential = verify_number(
        data["energy-consumption-potential"]
    )
    certificate.local_authority = data["local-authority"]
    certificate.built_form = data["built-form"]
    certificate.number_open_fireplaces = verify_number(data["number-open-fireplaces"])
    certificate.windows_description = data["windows-description"]
    certificate.glazed_area = data["glazed-area"]
    certificate.inspection_date = datetime.strptime(
        data["inspection-date"].replace("-", ""), "%Y%m%d"
    ).date()
    certificate.mains_gas_flag = data["mains-gas-flag"]
    certificate.co2_emiss_curr_per_floor_area = verify_number(
        data["co2-emiss-curr-per-floor-area"]
    )
    certificate.address1 = data["address1"]
    certificate.heat_loss_corridor = data["heat-loss-corridor"]
    certificate.flat_storey_count = verify_number(data["flat-storey-count"])
    certificate.constituency_label = data["constituency-label"]
    certificate.roof_energy_eff = convert_efficiency[data["roof-energy-eff"]]
    certificate.total_floor_area = verify_number(data["total-floor-area"])
    certificate.building_reference_number = data["building-reference-number"]
    certificate.environment_impact_current = verify_number(
        data["environment-impact-current"]
    )
    certificate.co2_emissions_current = verify_number(data["co2-emissions-current"])
    certificate.roof_description = data["roof-description"]
    certificate.floor_energy_eff = convert_efficiency[data["floor-energy-eff"]]
    certificate.number_habitable_rooms = verify_number(data["number-habitable-rooms"])
    certificate.address2 = data["address2"]
    certificate.hot_water_env_eff = convert_efficiency[data["hot-water-env-eff"]]
    certificate.posttown = data["posttown"]
    certificate.mainheatc_energy_eff = convert_efficiency[data["mainheatc-energy-eff"]]
    certificate.main_fuel = data["main-fuel"]
    certificate.lighting_env_eff = convert_efficiency[data["lighting-env-eff"]]
    certificate.windows_energy_eff = convert_efficiency[data["windows-energy-eff"]]
    certificate.floor_env_eff = convert_efficiency[data["floor-env-eff"]]
    certificate.lighting_description = data["lighting-description"]
    certificate.roof_env_eff = convert_efficiency[data["roof-env-eff"]]
    certificate.walls_energy_eff = convert_efficiency[data["walls-energy-eff"]]
    certificate.photo_supply = verify_number(data["photo-supply"])
    certificate.lighting_cost_potential = verify_number(data["lighting-cost-potential"])
    certificate.mainheat_env_eff = convert_efficiency[data["mainheat-env-eff"]]
    certificate.multi_glaze_proportion = verify_number(data["multi-glaze-proportion"])
    certificate.main_heating_controls = data["main-heating-controls"]
    certificate.lodgement_datetime = datetime.strptime(
        data["lodgement-datetime"].replace("-", ""), "%Y%m%d %H:%M:%S"
    )
    certificate.flat_top_storey = data["flat-top-storey"]
    certificate.current_energy_rating = data["current-energy-rating"]
    certificate.secondheat_description = data["secondheat-description"]
    certificate.walls_env_eff = convert_efficiency[data["walls-env-eff"]]
    certificate.transaction_type = data["transaction-type"]
    certificate.uprn = data["uprn"]
    certificate.current_energy_efficiency = verify_number(
        data["current-energy-efficiency"]
    )
    certificate.energy_consumption_current = verify_number(
        data["energy-consumption-current"]
    )
    certificate.mainheat_description = data["mainheat-description"]
    certificate.lighting_cost_current = verify_number(data["lighting-cost-current"])
    certificate.lodgement_date = datetime.strptime(
        data["lodgement-date"].replace("-", ""), "%Y%m%d"
    ).date()
    certificate.extension_count = verify_number(data["extension-count"])
    certificate.mainheatc_env_eff = convert_efficiency[data["mainheatc-env-eff"]]
    certificate.lmk_key = data["lmk-key"]
    certificate.wind_turbine_count = verify_number(data["wind-turbine-count"])
    certificate.tenure = data["tenure"]
    certificate.floor_level = data["floor-level"]
    certificate.potential_energy_efficiency = verify_number(
        data["potential-energy-efficiency"]
    )
    certificate.hot_water_energy_eff = convert_efficiency[data["hot-water-energy-eff"]]
    certificate.low_energy_lighting = verify_number(data["low-energy-lighting"])
    certificate.walls_description = data["walls-description"]
    certificate.hotwater_description = data["hotwater-description"]

    # Adjusted kicks in if potential cost > current cost (i.e. issue w the data)
    # In this case, based on BigQuery, it seems that no relevant recommendation exists
    # so potential should = current
    certificate.hot_water_cost_adjusted_potential = (
        certificate.hot_water_cost_potential
        if certificate.hot_water_cost_potential < certificate.hot_water_cost_current
        else certificate.hot_water_cost_current
    )

    certificate.heating_cost_adjusted_potential = (
        certificate.heating_cost_potential
        if certificate.heating_cost_potential < certificate.heating_cost_current
        else certificate.heating_cost_current
    )

    certificate.lighting_cost_adjusted_potential = (
        certificate.lighting_cost_potential
        if certificate.lighting_cost_potential < certificate.lighting_cost_current
        else certificate.lighting_cost_current
    )

    certificate.total_current_cost = (
        float(certificate.heating_cost_current)
        + float(certificate.lighting_cost_current)
        + float(certificate.hot_water_cost_current)
    )

    certificate.total_adjusted_potential_cost = (
        float(certificate.heating_cost_adjusted_potential)
        + float(certificate.lighting_cost_adjusted_potential)
        + float(certificate.hot_water_cost_adjusted_potential)
    )

    certificate.total_potential_cost = (
        float(certificate.heating_cost_potential)
        + float(certificate.lighting_cost_potential)
        + float(certificate.hot_water_cost_potential)
    )

    return certificate
