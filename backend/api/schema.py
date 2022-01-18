from graphene import ObjectType, String, Schema
import requests
import json

class Query(ObjectType):
    postcode = String(name=String(default_value="N/A"))

    def resolve_postcode(root, info, name):
        input_postcode = "SW109EF"
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={input_postcode}"
        headers = {
            'Accept': 'application/json',
            'Authorization': 'Basic amFycnlkLmNoZXNvQGdtYWlsLmNvbTpkMzEwOWRmYmI4ZDI2OWZiZDkxMjFlY2U0NGMxNjY2NTA1MDBiM2Jm'
        }
        payload = {}
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()["rows"]

        data = [item["address"] for item in responseJSON]
        return json.dumps(data)


schema = Schema(query=Query)