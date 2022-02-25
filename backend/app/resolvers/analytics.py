from app.types import Analytics
from scripts.analysis import (
    metrics_to_numeric,
    current_metrics,
    potential_metrics,
    house_rating_metrics,
    generate_normalised_data,
    convert_to_rating,
    convert_from_SAP,
)


def create_analytics(local_df):
    # Convert metrics to numbers to allow for calculations
    metrics_to_numeric(local_df, current_metrics)
    metrics_to_numeric(local_df, potential_metrics)
    metrics_to_numeric(local_df, ["total-floor-area"])
    metrics_to_numeric(local_df, ["low-energy-lighting"])
    generate_normalised_data(local_df, current_metrics, "total-floor-area")
    convert_to_rating(local_df, house_rating_metrics)
    local_df.fillna(value=0.0, inplace=True)

    analytics = Analytics()
    analytics.number_of_houses = len(local_df)
    analytics.mean_current_energy_efficiency = round(
        local_df["current-energy-efficiency"].mean(), 2
    )
    analytics.mean_current_energy_rating = convert_from_SAP(analytics.mean_current_energy_efficiency)
    analytics.mean_current_environment_impact = round(
        local_df["environment-impact-current"].mean(), 2
    )
    analytics.mean_current_energy_consumption = round(
        local_df["energy-consumption-current"].mean(), 2
    )
    analytics.mean_current_co2_consumption = round(
        local_df["co2-emissions-current"].mean(), 2
    )
    analytics.mean_current_lighting_cost = round(
        local_df["lighting-cost-current"].mean(), 2
    )
    analytics.mean_current_heating_cost = round(
        local_df["heating-cost-current"].mean(), 2
    )
    analytics.mean_current_hot_water_cost = round(
        local_df["hot-water-cost-current"].mean(), 2
    )
    analytics.mean_potential_energy_efficiency = round(
        local_df["potential-energy-efficiency"].mean(), 2
    )
    analytics.mean_potential_energy_rating = convert_from_SAP(analytics.mean_potential_energy_efficiency)
    analytics.mean_potential_environment_impact = round(
        local_df["environment-impact-potential"].mean(), 2
    )
    analytics.mean_potential_energy_consumption = round(
        local_df["energy-consumption-potential"].mean(), 2
    )
    analytics.mean_potential_co2_consumption = round(
        local_df["co2-emissions-potential"].mean(), 2
    )
    analytics.mean_potential_lighting_cost = round(
        local_df["lighting-cost-potential"].mean(), 2
    )
    analytics.mean_potential_heating_cost = round(
        local_df["heating-cost-potential"].mean(), 2
    )
    analytics.mean_potential_hot_water_cost = round(
        local_df["hot-water-cost-potential"].mean(), 2
    )
    analytics.normalised_current_energy_efficiency = round(
        local_df["current-energy-efficiency-per-total-floor-area"], 2
    )
    analytics.normalised_current_environment_impact = round(
        local_df["environment-impact-current-per-total-floor-area"], 2
    )
    analytics.normalised_current_energy_consumption = round(
        local_df["energy-consumption-current-per-total-floor-area"], 2
    )
    analytics.normalised_current_co2_consumption = round(
        local_df["current-energy-efficiency-per-total-floor-area"], 2
    )
    analytics.normalised_current_lighting_cost = round(
        local_df["lighting-cost-current-per-total-floor-area"], 2
    )
    analytics.normalised_current_heating_cost = round(
        local_df["heating-cost-current-per-total-floor-area"], 2
    )
    analytics.normalised_current_hot_water_cost = round(
        local_df["hot-water-cost-current-per-total-floor-area"], 2
    )

    # ratings means for housing tile comparison
    analytics.mean_low_energy_lighting = round(
        local_df["low-energy-lighting"].mean(), 2
    )
    analytics.mean_lighting_energy_eff = round(
        local_df["lighting-energy-eff"].mean(), 2
    )
    analytics.mean_lighting_environmental_eff = round(
        local_df["lighting-env-eff"].mean(), 2
    )
    analytics.mean_walls_energy_eff = round(local_df["walls-energy-eff"].mean(), 2)
    analytics.mean_walls_environmental_eff = round(local_df["walls-env-eff"].mean(), 2)
    analytics.mean_water_energy_eff = round(local_df["hot-water-energy-eff"].mean(), 2)
    analytics.mean_water_environmental_eff = round(
        local_df["hot-water-env-eff"].mean(), 2
    )
    analytics.mean_floor_energy_eff = round(local_df["floor-energy-eff"].mean(), 2)
    analytics.mean_floor_environmental_eff = round(local_df["floor-env-eff"].mean(), 2)
    analytics.mean_roof_energy_eff = round(local_df["roof-energy-eff"].mean(), 2)
    analytics.mean_roof_environmental_eff = round(local_df["roof-env-eff"].mean(), 2)
    analytics.mean_main_heating_energy_eff = round(
        local_df["mainheat-energy-eff"].mean(), 2
    )
    analytics.mean_main_heating_environmental_eff = round(
        local_df["mainheat-env-eff"].mean(), 2
    )
    analytics.mean_main_heating_controls_energy_eff = round(
        local_df["mainheatc-energy-eff"].mean(), 2
    )
    analytics.mean_main_heating_controls_environmental_eff = round(
        local_df["mainheat-env-eff"].mean(), 2
    )
    analytics.mean_second_heating_energy_eff = round(
        local_df["sheating-energy-eff"].mean(), 2
    )
    analytics.mean_second_heating_environmental_eff = round(
        local_df["sheating-env-eff"].mean(), 2
    )
    analytics.mean_windows_energy_eff = round(local_df["windows-energy-eff"].mean(), 2)
    analytics.mean_windows_environmental_eff = round(
        local_df["windows-env-eff"].mean(), 2
    )

    return analytics
