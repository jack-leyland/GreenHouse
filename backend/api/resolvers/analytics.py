import pandas as pd

from api.types import Analytics
from scripts.analysis import (
    metrics_to_numeric,
    current_metrics,
    potential_metrics,
    generate_normalised_data,
    convert_to_rating,
)


def create_analytics(local_df):
    # Convert metrics to numbers to allow for calculations
    metrics_to_numeric(local_df, current_metrics)
    metrics_to_numeric(local_df, potential_metrics)
    metrics_to_numeric(local_df, ["total-floor-area"])
    generate_normalised_data(local_df, current_metrics, "total-floor-area")
    convert_to_rating(local_df, "lighting-energy-eff")

    analytics = Analytics()
    analytics.number_of_houses = len(local_df)
    analytics.mean_current_energy_efficiency = local_df[
        "current-energy-efficiency"
    ].mean()
    analytics.mean_current_environment_impact = local_df[
        "environment-impact-current"
    ].mean()
    analytics.mean_current_energy_consumption = local_df[
        "energy-consumption-current"
    ].mean()
    analytics.mean_current_co2_emissions = local_df["co2-emissions-current"].mean()
    analytics.mean_current_lighting_cost = local_df["lighting-cost-current"].mean()
    analytics.mean_current_heating_cost = local_df["heating-cost-current"].mean()
    analytics.mean_current_hot_water_cost = local_df["hot-water-cost-current"].mean()
    analytics.mean_lighting_energy_eff = local_df["lighting-energy-eff"].mean()
    analytics.mean_potential_energy_efficiency = local_df[
        "potential-energy-efficiency"
    ].mean()
    analytics.mean_potential_environment_impact = local_df[
        "environment-impact-potential"
    ].mean()
    analytics.mean_potential_energy_consumption = local_df[
        "energy-consumption-potential"
    ].mean()
    analytics.mean_potential_co2_consumption = local_df[
        "co2-emissions-potential"
    ].mean()
    analytics.mean_potential_lighting_cost = local_df["lighting-cost-potential"].mean()
    analytics.mean_potential_heating_cost = local_df["heating-cost-potential"].mean()
    analytics.mean_potential_hot_water_cost = local_df[
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
