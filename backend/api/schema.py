from graphene import ObjectType, String, Schema
import requests
import json
import environ
import os

# Set the project base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

EPC_API_KEY = os.environ.get("EPC_API_KEY")

headers = {
    "Accept": "application/json",
    "Authorization": f"Basic {EPC_API_KEY}",
}

payload = {}


class Query(ObjectType):
    address = String(name=String(default_value="N/A"))
    certificate = String(name=String(default_value="N/A"))
    recommendations = String(name=String(default_value="N/A"))

    def resolve_address(root, info, name):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={name}"
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()["rows"]
        data = [
            {"address": item["address"], "lmk-key": item["lmk-key"]}
            for item in responseJSON
        ]
        return json.dumps(data)

    def resolve_certificate(root, info, name):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/certificate/{name}"
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()

        if not responseJSON:
            return {"Error": "Invalid LMK key"}

        return json.dumps(responseJSON["rows"][0])

    def resolve_recommendations(root, info, name):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/recommendations/{name}"
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()

        if not responseJSON:
            return {"Error": "Invalid LMK key"}

        return json.dumps(responseJSON["rows"])


schema = Schema(query=Query)
