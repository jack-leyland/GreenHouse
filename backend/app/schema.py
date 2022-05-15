import os

import environ
import pandas as pd
import requests

from google.cloud import bigquery
from graphene import Boolean, Field, Float, List, Mutation, ObjectType, Schema, String
from graphene_django import DjangoObjectType

from app.models import CompletedRecommendation
from app.resolvers.addresses import create_addresses
from app.resolvers.analytics import create_analytics
from app.resolvers.certificates import create_certificate
from app.resolvers.recommendations import create_recommendations
from app.resolvers.timeseries import create_timeseries
from app.types import (
    Address,
    Analytics,
    Certificate,
    Improvement,
    Recommendation,
    Timeseries,
    LocalImprovement,
)

# Set the project base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

EPC_API_KEY = os.environ.get("EPC_API_KEY")

ENV = os.environ.get("ENV")

if ENV == "DEV":
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "api/.google_credentials.json"

headers = {
    "Accept": "application/json",
    "Authorization": f"Basic {EPC_API_KEY}",
}

payload = {}


def verify_client(info):
    # print(f"env: {ENV}")
    url = info.context.META["HTTP_REFERER"]
    if ENV == "DEV":
        return url.startswith("http://localhost:3000")

    return url.startswith("https://epc-site-frontend.vercel.app")


class AddImprovement(Mutation):
    class Arguments:
        cost = Float()
        date = String()
        lmk_key = String()
        improvement_id = String()
        postcode = String()

    ok = Boolean()
    improvement = Field(lambda: Improvement)

    def mutate(root, info, cost, date, lmk_key, improvement_id, postcode):
        if not verify_client(info):
            return None
        print(cost, date, lmk_key, improvement_id, postcode)
        improvement = Improvement(
            cost=cost,
            date=date,
            lmk_key=lmk_key,
            improvement_id=improvement_id,
            postcode=postcode,
        )
        db_improvement = CompletedRecommendation(
            cost=cost,
            date=date,
            lmk_key=lmk_key,
            improvement_id=improvement_id,
            postcode=postcode,
        )
        db_improvement.save()
        ok = True

        return AddImprovement(improvement=improvement, ok=ok)


class Mutation(ObjectType):
    add_improvement = AddImprovement.Field()


class CompletedRecommendationType(DjangoObjectType):
    class Meta:
        model = CompletedRecommendation
        fields = ("lmk_key", "improvement_id", "date", "cost", "postcode")


class Query(ObjectType):
    address = Field(List(Address), postcode=String(default_value="N/A"))
    recommendations = Field(List(Recommendation), lmk=String(default_value="N/A"))
    analytics = Field(Analytics, lmk=String(default_value="N/A"))
    certificate = Field(Certificate, lmk=String(default_value="N/A"))
    big_query = Field(Timeseries)
    local_recommendations = Field(
        List(LocalImprovement), postcode=String(default_value="N/A")
    )

    def resolve_analytics(root, info, lmk):
        if not verify_client(info):
            return None
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/certificate/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"][0]
        postcode = data["postcode"]
        if len(postcode) == 7:
            postcode = postcode[:5]
        else:
            postcode = postcode[:4]

        page_size = 1000
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()

        result = pd.DataFrame(data=data["rows"], columns=data["column-names"])

        return create_analytics(result)

    def resolve_address(root, info, postcode):
        if not verify_client(info):
            return None

        page_size = 1000
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}&size={page_size}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"]
        if not data:
            return {"Error": "Invalid LMK key"}
        return create_addresses(data)

    def resolve_certificate(root, info, lmk):
        if not verify_client(info):
            return None
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/certificate/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"][0]

        if not data:
            return {"Error": "Invalid LMK key"}

        return create_certificate(data)

    def resolve_recommendations(root, info, lmk):
        if not verify_client(info):
            return None
        url = (
            f"https://epc.opendatacommunities.org/api/v1/domestic/recommendations/{lmk}"
        )
        response = requests.request("GET", url, headers=headers, data=payload)
        data = response.json()["rows"]
        if not data:
            return {"Error": "Invalid LMK key"}

        completed_recs = CompletedRecommendation.objects.filter(lmk_key=lmk)

        return create_recommendations(data, completed_recs)

    def resolve_big_query(root, info):
        client = bigquery.Client()

        query = """
            SELECT *
            FROM `arcane-sentinel-340313.test_epc.cambridge`
        """
        local_df = (
            client.query(query)
            .result()
            .to_dataframe(
                # Optionally, explicitly request to use the BigQuery Storage API. As of
                # google-cloud-bigquery version 1.26.0 and above, the BigQuery Storage
                # API is used by default.
                create_bqstorage_client=True,
            )
        )
        return create_timeseries(local_df)

    def resolve_local_recommendations(root, info, postcode):
        if not verify_client(info):
            return None
        area = postcode[:3]

        if len(postcode) == 7:
            area = postcode[:4]

        completed_recs = CompletedRecommendation.objects.filter(
            postcode__startswith=area
        )
        costs = {}

        for rec in completed_recs:
            if rec.improvement_id in costs:
                costs[rec.improvement_id].append(rec.cost)
            else:
                costs[rec.improvement_id] = [rec.cost]

        results = []
        for id in costs:
            result = LocalImprovement()
            result.improvement_id = id
            result.frequency = len(costs[id])
            result.average_cost = sum(costs[id]) / result.frequency
            results.append(result)

        return results


schema = Schema(query=Query, mutation=Mutation)
