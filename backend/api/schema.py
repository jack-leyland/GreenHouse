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

    def resolve_address(root, info, name):
        input_postcode = name
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={input_postcode}"
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()["rows"]

        data = [item["address"] for item in responseJSON]
        return json.dumps(data)


schema = Schema(query=Query)