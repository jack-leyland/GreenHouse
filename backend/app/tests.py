from graphene_django.utils.testing import GraphQLTestCase
from .schema import schema
import json


class QueryTestCase(GraphQLTestCase):
    GRAPHQL_SCHEMA = schema
    GRAPHQL_URL = "/graphql"

    def test_address_query(self):
        response = self.query(
            """
            query address($postcode: String!) {
                address(postcode: $postcode) {
                    lmkKey
                    address
                }
            }
            """,
            variables={"postcode": "SW66TF"},
        )

        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
