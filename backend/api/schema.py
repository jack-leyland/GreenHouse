from email.mime import base
from graphene import (
    ObjectType,
    String,
    Schema,
    Field,
    List,
)
import requests
import environ
import os
import pandas as pd

from api.types import (
    Certificate,
    Analytics,
    Address,
    Recommendation,
)

from api.resolvers.analytics import create_analytics
from api.resolvers.addresses import create_addresses
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
    address = Field(List(Address), postcode=String(default_value="N/A"))
    recommendations = Field(List(Recommendation), lmk=String(default_value="N/A"))
    analytics = Field(Analytics, postcode=String(default_value="N/A"))
    certificate = Field(Certificate, lmk=String(default_value="N/A"))

    def resolve_analytics(root, info, postcode):
        if len(postcode) == 7:
            postcode = postcode[:4]
        else:
            postcode = postcode[:3]
        base_url = "https://epc.opendatacommunities.org/api/v1/domestic/"
        page_size = 5000
        url = f"{base_url}search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()
        local_df1 = pd.DataFrame(data=data["rows"], columns=data["column-names"])
        url = f"search?postcode={postcode}&size={page_size}&from={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()
        local_df2 = pd.DataFrame(data=data["rows"], columns=data["column-names"])
        result = pd.concat([local_df1, local_df2])
        return create_analytics(result)

    def resolve_address(root, info, postcode):
        page_size = 1000
        base_url = "https://epc.opendatacommunities.org/api/v1/domestic/"
        url = f"{base_url}search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"]

        if not data:
            return {"Error": "Invalid LMK key"}
        return create_addresses(data)

    def resolve_certificate(root, info, lmk):
        base_url = "https://epc.opendatacommunities.org/api/v1/domestic/"
        url = f"{base_url}certificate/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"][0]

        if not data:
            return {"Error": "Invalid LMK key"}

        return create_certificate(data)

    def resolve_recommendations(root, info, lmk):
        base_url = "https://epc.opendatacommunities.org/api/v1/domestic/"
        url = f"{base_url}recommendations/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"]

        if not data:
            return {"Error": "Invalid LMK key"}

        return create_recommendations(data)


schema = Schema(query=Query)
