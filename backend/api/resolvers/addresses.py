from api.types import Address


def create_addresses(data):
    addresses = []
    for obj in data:
        address = Address()
        address.lmk_key = obj["lmk-key"]
        address.address = obj["address"]
        addresses.append(address)
    return addresses
