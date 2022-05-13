from cmath import nan
from libcst import Integer
from numpy import NaN, average
import pandas as pd
import datetime
import numpy as np 

timeseries_metrics = [
   "LIGHTING_ENERGY_EFF",
    "LIGHTING_ENV_EFF",
    "WALLS_ENERGY_EFF",
    "WALLS_ENV_EFF",
    "WINDOWS_ENERGY_EFF",
    "WINDOWS_ENV_EFF",
    "HOT_WATER_ENERGY_EFF",
    "HOT_WATER_ENV_EFF",
    "FLOOR_ENERGY_EFF",
    "FLOOR_ENV_EFF",
    "ROOF_ENERGY_EFF",
    "ROOF_ENV_EFF",
    "MAINHEAT_ENERGY_EFF",
    "MAINHEAT_ENV_EFF",
    "MAINHEATC_ENERGY_EFF",
    "MAINHEATC_ENV_EFF",
    "SHEATING_ENERGY_EFF",
    "SHEATING_ENV_EFF",
]

metrics = [
    "energy-rating",
    "energy-efficiency",
    "environment-impact",
    "energy-consumption",
    "co2-emissions",
    "lighting-cost",
    "heating-cost",
    "hot-water-cost",
]

current_metrics = [
    "current-energy-rating",
    "current-energy-efficiency",
    "environment-impact-current",
    "energy-consumption-current",
    "co2-emissions-current",
    "lighting-cost-current",  # CO2-emissions had a column for emissions/floor area
    "heating-cost-current",
    "hot-water-cost-current",
]

potential_metrics = [
    "potential-energy-rating",
    "potential-energy-efficiency",
    "environment-impact-potential",
    "energy-consumption-potential",
    "co2-emissions-potential",
    "lighting-cost-potential",
    "heating-cost-potential",
    "hot-water-cost-potential",
]

house_rating_metrics = [
    "lighting-energy-eff",
    "lighting-env-eff",
    "walls-energy-eff",
    "walls-env-eff",
    "windows-energy-eff",
    "windows-env-eff",
    "hot-water-energy-eff",
    "hot-water-env-eff",
    "floor-energy-eff",
    "floor-env-eff",
    "roof-energy-eff",
    "roof-env-eff",
    "mainheat-energy-eff",
    "mainheat-env-eff",
    "mainheatc-energy-eff",
    "mainheatc-env-eff",
    "sheating-energy-eff",
    "sheating-env-eff",
]

rating_number = {
    "": NaN,
    "N/A": NaN,
    "NO DATA!": NaN,
    "Very Poor": 1,
    "Poor": 2,
    "Average": 3,
    "Good": 4,
    "Very Good": 5,
}

timeseries_L10_years = [
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
]

empty_string = {
    "": NaN,
}

def metrics_to_numeric(dataframe, metrics):
    """
    Convert the columns with column name in metrics in the Pandas
    dataframe to numerical values.
    """
    for metric in metrics:
        dataframe[metric] = pd.to_numeric(dataframe[metric], errors="coerce")


def generate_differences(dataframe, metrics, currents, potentials):
    """
    Generate columns based on the differences between currents and potentials
    """
    for metric, current, potential in zip(metrics, currents, potentials):
        label = "difference-" + metric
        dataframe[label] = dataframe[potential] - dataframe[current]


def generate_normalised_data(dataframe, currents, normalise):
    """
    Generate columns based on normalising the currents by the normalise column
    """
    for current in currents:
        label = current + "-per-" + normalise
        dataframe[label] = dataframe[current] / dataframe[normalise]


def convert_to_rating(dataframe, house_rating_metrics):
    for house_rating in house_rating_metrics:
        #fixed_metric = house_rating.upper().replace("-", "_") #DELETE THIS FOR NON BIGQUERY
        dataframe[house_rating].replace(rating_number, inplace=True)

def convert_from_SAP(sap_rating):
    if sap_rating in range(21):
        return 'G'
    elif sap_rating in range(39):
        return 'F'
    elif sap_rating in range(55):
        return 'E'
    elif sap_rating in range(69):
        return 'D'
    elif sap_rating in range(81):
        return 'C'
    elif sap_rating in range(92):
        return 'B'
    else:
        return 'A'

def verify_number(data):
    if data:
        return data
    return None

def convert_from_SAP(sap_rating):
    sap_rating = int(sap_rating)
    if sap_rating in range(21):
        return 'G'
    elif sap_rating in range(21,39):
        return 'F'
    elif sap_rating in range(39,55):
        return 'E'
    elif sap_rating in range(55,69):
        return 'D'
    elif sap_rating in range(69,81):
        return 'C'
    elif sap_rating in range(81,92):
        return 'B'
    else:
        return 'A'

def av_annual_rating_data(dataframe, features = timeseries_metrics):
    dataframe.sort_values("ADDRESS")
    feature_averages = {}
    counts = {}
    for feature in features:
        feature_averages[feature] = 0
        counts[feature] = 0

    for i, house in dataframe.iterrows():
        address = house["ADDRESS"]
        if i + 1 < len(dataframe):
            other_house_address = dataframe.iloc[i+1, dataframe.columns.get_loc("ADDRESS")]
            if other_house_address == address:
                year_diff_neg = int(pd.to_datetime(house["INSPECTION_DATE"]).year) \
                    - int(pd.to_datetime(dataframe.iloc[i+1, dataframe.columns.get_loc("INSPECTION_DATE")]).year)
                for feature_name in features:
                    difference = 0
                    if year_diff_neg < 0:
                        difference = dataframe.iloc[i+1, dataframe.columns.get_loc(feature_name)] - house[feature_name]
                        year_diff = abs(year_diff_neg)
                        if year_diff > 0 and difference > 0: #EPC sometimes gives negative over time
                            if difference / year_diff > 0 or difference / year_diff < 0:
                                feature_averages[feature_name] += difference / year_diff
                                counts[feature_name] += 1
                    else:
                        difference = house[feature_name] - dataframe.iloc[i+1, dataframe.columns.get_loc(feature_name)]
                        year_diff = abs(year_diff_neg)
                        if year_diff > 0 and difference > 0: #EPC sometimes gives negative over time
                            if difference / year_diff > 0 or difference / year_diff < 0:
                                feature_averages[feature_name] += difference / year_diff
                                counts[feature_name] += 1
                                
    average_values = {}
    for k, v in feature_averages.items():
        average_values[k] = v / counts[k] if counts[k] != 0 else 0
    return average_values 

def timeseries_data(dataframe, features = timeseries_metrics, years = timeseries_L10_years):
    # Create a new column in dataframe with "years"
    dataframe["YEAR"] = pd.DatetimeIndex(dataframe["INSPECTION_DATE"]).year

    # # First filter the dataframe by the year
    # for year in years:
    
    #     # Then take the average of each feature across years         
    #     for feature in features:
            



    # print(dataframe["YEAR"])    
    return
