from graphene import (
    ObjectType,
    String,
    Schema,
    Field,
    List,
)
import requests
import json
import environ
import os
import pandas as pd
from datetime import datetime

from api.types import (
    Certificate,
    Analytics,
    Address,
    Recommendation,
)

from api.resolvers.analytics import create_analytics
from api.resolvers.address import create_address
from api.resolvers.certificates import create_certificate
from api.resolvers.recommendations import create_recommendations

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
    address = Field(Address, postcode=String(default_value="N/A"))
    recommendations = Field(List(Recommendation), lmk=String(default_value="N/A"))
    analytics = Field(Analytics, postcode=String(default_value="N/A"))
    certificate = Field(Certificate, lmk=String(default_value="N/A"))

    def resolve_analytics(root, info, postcode):
        page_size = 5000
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()

        return create_analytics(data)

    def resolve_address(root, info, postcode):
        page_size = 100
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"][0]
        return create_address(data)

    def resolve_certificate(root, info, lmk):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/certificate/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"][0]

        if not response:
            return {"Error": "Invalid LMK key"}

        return create_certificate(data)

    def resolve_recommendations(root, info, lmk):
        url = (
            f"https://epc.opendatacommunities.org/api/v1/domestic/recommendations/{lmk}"
        )
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"]
        if not data:
            return {"Error": "Invalid LMK key"}

        return create_recommendations(data)


schema = Schema(query=Query)
