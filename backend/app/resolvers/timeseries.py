from app.types import Timeseries
from scripts.analysis import av_annual_rating_data, timeseries_data, convert_to_rating, timeseries_metrics


def create_timeseries(data):
    # Get correct data and split into x
    convert_to_rating(data, timeseries_metrics) # Converts categorical to numeric
    averages_dict = av_annual_rating_data(data)
    
    # Create Timeseries object instance
    results = Timeseries()

    # Assign average annual change p.y. from epcs with 2+ submissions per property 
    results.average_annual_change_lighting_energy_eff = averages_dict["LIGHTING_ENERGY_EFF"]
    results.average_annual_change_lighting_environmental_eff = averages_dict["LIGHTING_ENV_EFF"]
    results.average_annual_change_walls_energy_eff = averages_dict["WALLS_ENERGY_EFF"]
    results.average_annual_change_walls_environmental_eff = averages_dict[
        "WALLS_ENV_EFF"
    ]
    results.average_annual_change_water_energy_eff = averages_dict[
        "HOT_WATER_ENERGY_EFF"
    ]
    results.average_annual_change_water_environmental_eff = averages_dict[
        "HOT_WATER_ENV_EFF"
    ]
    results.average_annual_change_floor_energy_eff = averages_dict["FLOOR_ENERGY_EFF"]
    results.average_annual_change_floor_environmental_eff = averages_dict[
        "FLOOR_ENV_EFF"
    ]
    results.average_annual_change_roof_energy_eff = averages_dict["ROOF_ENERGY_EFF"]
    results.average_annual_change_roof_environmental_eff = averages_dict["ROOF_ENV_EFF"]
    results.average_annual_change_main_heating_energy_eff = averages_dict["MAINHEAT_ENERGY_EFF"]
    results.average_annual_change_main_heating_environmental_eff = averages_dict["MAINHEAT_ENV_EFF"]
    results.average_annual_change_main_heating_controls_energy_eff = averages_dict["MAINHEATC_ENERGY_EFF"]
    results.average_annual_change_main_heating_controls_environmental_eff = averages_dict["MAINHEATC_ENV_EFF"]
    results.average_annual_change_second_heating_energy_eff = averages_dict["SHEATING_ENERGY_EFF"]
    results.average_annual_change_second_heating_environmental_eff = averages_dict["SHEATING_ENV_EFF"]
    results.average_annual_change_windows_energy_eff = averages_dict["WINDOWS_ENERGY_EFF"]
    results.average_annual_change_windows_environmental_eff = averages_dict["WINDOWS_ENV_EFF"]

    # Assign general average per year
    timeseries_dict = timeseries_data(data)

    # Assign average ratings per year (2008 - 2021) 
    results.average_timeseries_lighting_energy_eff = timeseries_dict["LIGHTING_ENERGY_EFF"]
    results.average_timeseries_lighting_environmental_eff = timeseries_dict["LIGHTING_ENV_EFF"]
    results.average_timeseries_walls_energy_eff = timeseries_dict["WALLS_ENERGY_EFF"]
    results.average_timeseries_walls_environmental_eff = timeseries_dict["WALLS_ENV_EFF"]
    results.average_timeseries_water_energy_eff = timeseries_dict["HOT_WATER_ENERGY_EFF"]
    results.average_timeseries_water_environmental_eff = timeseries_dict["HOT_WATER_ENV_EFF"]
    results.average_timeseries_floor_energy_eff = timeseries_dict["FLOOR_ENERGY_EFF"]
    results.average_timeseries_floor_environmental_eff = timeseries_dict["FLOOR_ENV_EFF"]
    results.average_timeseries_roof_energy_eff = timeseries_dict["ROOF_ENERGY_EFF"]
    results.average_timeseries_roof_environmental_eff = timeseries_dict["ROOF_ENV_EFF"]
    results.average_timeseries_main_heating_energy_eff = timeseries_dict["MAINHEAT_ENERGY_EFF"]
    results.average_timeseries_main_heating_environmental_eff = timeseries_dict["MAINHEAT_ENV_EFF"]
    results.average_timeseries_main_heating_controls_energy_eff = timeseries_dict["MAINHEATC_ENERGY_EFF"]
    results.average_timeseries_main_heating_controls_environmental_eff = timeseries_dict["MAINHEATC_ENV_EFF"]
    results.average_timeseries_second_heating_energy_eff = timeseries_dict["SHEATING_ENERGY_EFF"]
    results.average_timeseries_second_heating_environmental_eff = timeseries_dict["SHEATING_ENV_EFF"]
    results.average_timeseries_windows_energy_eff = timeseries_dict["WINDOWS_ENERGY_EFF"]
    results.average_timeseries_windows_environmental_eff = timeseries_dict["WINDOWS_ENV_EFF"]

    return results

