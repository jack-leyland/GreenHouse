import graphene
from graphene import ObjectType, String, Schema
import requests
import json
import environ
import os
import datetime

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

class Certificate(ObjectType):
    low_energy_fixed_light_count: graphene.Float() 
    address: graphene.String()
    uprn_source: graphene.String()
    floor_height:  graphene.Float() 
    heating_cost_potential: graphene.Float() 
    unheated_corridor_length: graphene.Float() 
    hot_water_cost_potential: graphene.Float() 
    construction_age_band: graphene.String()
    potential_energy_rating: graphene.String()
    mainheat_energy_eff: graphene.String()
    windows_env_eff: graphene.String()
    lighting_energy_eff: graphene.String() 
    environment_impact_potential: graphene.Float() 
    glazed_type: graphene.String()
    heating_cost_current: graphene.Float() 
    address3:  graphene.String() 
    mainheatcont_description: graphene.String()
    sheating_energy_eff: graphene.String()
    property_type: graphene.String()
    local_authority_label: graphene.String()
    fixed_lighting_outlets_count: graphene.Float() 
    energy_tariff: graphene.String() 
    mechanical_ventilation: graphene.String() 
    hot_water_cost_current: graphene.Float() 
    county: graphene.String()
    postcode: graphene.String()
    solar_water_heating_flag: graphene.String() 
    constituency: graphene.String()
    co2_emissions_potential: graphene.Float() 
    number_heated_rooms: graphene.Float() 
    floor_description: graphene.String()
    energy_consumption_potential: graphene.Float() 
    local_authority: graphene.String()
    built_form: graphene.String()
    number_open_fireplaces: graphene.Float() 
    windows_description: graphene.String()
    glazed_area: graphene.String() 
    inspection_date: graphene.Date() 
    mains_gas_flag: graphene.String() 
    co2_emiss_curr_per_floor_area: graphene.Float() 
    address1: graphene.String() 
    heat_loss_corridor: graphene.String() 
    flat_storey_count:  graphene.String() 
    constituency_label: graphene.String() 
    roof_energy_eff: graphene.String() 
    total_floor_area: graphene.Float() 
    building_reference_number: graphene.String() 
    environment_impact_current: graphene.Float() 
    co2_emissions_current: graphene.Float() 
    roof_description: graphene.String()
    floor_energy_eff: graphene.String()
    number_habitable_rooms: graphene.Float()  
    address2: graphene.String() 
    hot_water_env_eff:graphene.String()
    posttown: graphene.String() 
    mainheatc_energy_eff:graphene.String()
    main_fuel: graphene.String()
    lighting_env_eff: graphene.String()
    windows_energy_eff: graphene.String()
    floor_env_eff: graphene.String()
    sheating_env_eff:graphene.String() 
    lighting_description: graphene.String()
    roof_env_eff: graphene.String() 
    walls_energy_eff: graphene.String() 
    photo_supply: graphene.String() 
    lighting_cost_potential: graphene.Float() 
    mainheat_env_eff: graphene.String() 
    multi_glaze_proportion: graphene.Float()  
    main_heating_controls: graphene.Float()  
    lodgement_datetime: graphene.DateTime() 
    flat_top_storey: graphene.String() 
    current_energy_rating: graphene.String() 
    secondheat_description: graphene.Float()  
    walls_env_eff: graphene.String() 
    transaction_type: graphene.String() 
    uprn: graphene.String()
    current_energy_efficiency: graphene.Float()  
    energy_consumption_current: graphene.Float() 
    mainheat_description: graphene.String()
    lighting_cost_current: graphene.Float() 
    lodgement_date: graphene.Date()
    extension_count: graphene.Float()  
    mainheatc_env_eff: graphene.String() 
    lmk_key: graphene.String()
    wind_turbine_count: graphene.Float() 
    tenure: graphene.String() 
    floor_level: graphene.String() 
    potential_energy_efficiency: graphene.Float() 
    hot_water_energy_eff: graphene.String() 
    low_energy_lighting: graphene.Float() 
    walls_description: graphene.String()
    hotwater_description: graphene.String()
    
class Analytics(ObjectType):
    # average_energy_rating = graphene.Char()
    average_energy_efficiency = graphene.Float()
    average_environment_impact = graphene.Float()
    average_energy_consumption = graphene.Float() 
    average_co2_consumption = graphene.Float()
    average_lighting_cost = graphene.Float() 
    average_heating_cost =  graphene.Float()
    average_hot_water_cost = graphene.Float()
    datetime = graphene.Date()


class Query(ObjectType):
    address = String(postcode=String(default_value="N/A"))
    certificate = String(lmk=String(default_value="N/A"))
    recommendations = String(lmk=String(default_value="N/A"))
    analytics = graphene.Field(Analytics, postcode=String(default_value="N/A"))

    def resolve_analytics(root, info, postcode):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/recommendations/{postcode}"
        response = requests.request("GET", url, headers=headers, data=payload)
        
        average_energy_efficiency = 0
        average_environment_impact = 0
        average_energy_consumption = 0
        average_co2_consumption = 0
        average_lighting_cost = 0
        average_heating_cost = 0
        average_hot_water_cost =  0
        average_datetime = datetime.datetime.strptime("2018_05_14".replace("_",""), "%Y%m%d").date()
         
        return Analytics(average_energy_efficiency, average_environment_impact, average_energy_consumption,  average_co2_consumption, average_lighting_cost,  average_heating_cost, average_hot_water_cost, average_datetime)


    
    def resolve_address(root, info, postcode):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/search?postcode={postcode}"
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()["rows"]
        data = [
            {"address": item["address"], "lmk": item["lmk-key"]}
            for item in responseJSON
        ]
        return json.dumps(data)

    def resolve_certificate(root, info, lmk):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/certificate/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()
        
        if not responseJSON:
            return {"Error": "Invalid LMK key"}

        return json.dumps(responseJSON["rows"][0])

    def resolve_recommendations(root, info, lmk):
        url = f"https://epc.opendatacommunities.org/api/v1/domestic/recommendations/{lmk}"
        response = requests.request("GET", url, headers=headers, data=payload)
        responseJSON = response.json()

        if not responseJSON:
            return {"Error": "Invalid LMK key"}

        return json.dumps(responseJSON["rows"])

 

        
schema = Schema(query=Query)
