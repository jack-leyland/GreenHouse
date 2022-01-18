from graphene import ObjectType, String, Schema
import requests
import json

headers = {
    'Accept': 'application/json',
    'Authorization': 'Basic amFycnlkLmNoZXNvQGdtYWlsLmNvbTpkMzEwOWRmYmI4ZDI2OWZiZDkxMjFlY2U0NGMxNjY2NTA1MDBiM2Jm'
}

payload = {}

class Query(ObjectType):
    address = String(name=String(default_value="N/A"))
    epc = String(name=String(default_value="N/A"))

    def resolve_address(root, info, name):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={name}"
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()["rows"]

        data = [{"address" : item["address"], "lmk-key" : item["lmk-key"]} for item in responseJSON]
        return json.dumps(data)

    def resolve_epc(root, info, name):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/certificate/{name}"
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()

        if (not responseJSON): return {"Error": "Invalid LMK key" }

        return responseJSON["rows"][0]

schema = Schema(query=Query)