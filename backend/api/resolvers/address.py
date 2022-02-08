from api.types import Address


def create_address(data):
    address = Address()
    address.lmk_key = data["lmk-key"]
    address.address1 = data["address1"]
    address.address2 = data["address2"]
    address.address3 = data["address3"]
    address.postcode = data["postcode"]
    address.building_reference_number = data["building-reference-number"]
    address.inspection_date = data["inspection-date"]
    return address
