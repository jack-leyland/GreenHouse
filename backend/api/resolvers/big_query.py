from api.types import Big_Query

def create_bquery(data):
    bquery = Big_Query()
    bquery.co2_average = data["co2-emmissions-current"].max()
    return bquery