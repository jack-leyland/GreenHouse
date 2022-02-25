from app.types import Big_Query
from scripts.analysis import timeseries_data


def create_bquery(data):
    # Get correct data and split into x
    bquery = Big_Query()
    print(timeseries_data(data))
    # bquery.co2_average = data["CO2_EMISSIONS_CURRENT"].mean()
    return bquery
