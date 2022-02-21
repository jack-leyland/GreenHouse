from app.types import Big_Query


def create_bquery(data):
    #Get correct data and split into x
    bquery = Big_Query()
    bquery.co2_average = data["CO2_EMISSIONS_CURRENT"].mean()
    return bquery
