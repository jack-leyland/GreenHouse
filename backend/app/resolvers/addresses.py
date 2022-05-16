from app.types import Address
from datetime import datetime


def create_addresses(data):

    addresses = []
    for obj in data:
        address = Address()
        address.address = obj["address"]
        address.lmk_key = obj["lmk-key"]
        address.date = datetime.strptime(obj["inspection-date"], "%Y-%m-%d")
        repeat = False

        # compare address with already existing address - if the same,
        # replace with later date address
        for other in addresses:
            if other.address == address.address:
                repeat = True
                if address.date >= other.date:
                    other = address

        if not repeat:
            addresses.append(address)

    return addresses
