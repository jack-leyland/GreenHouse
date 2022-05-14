from app.types import Recommendation


def create_recommendations(data, completed):
    recommendations = []
    completed_set = set(completed)
    lmk_key = "N/A"

    # Loop through recommendations from API and add to list
    for obj in data:
        recommendation = Recommendation()
        lmk_key = obj["lmk-key"]
        recommendation.lmk_key = obj["lmk-key"]
        recommendation.improvement_item = obj["improvement-item"]
        recommendation.indicative_cost = obj["indicative-cost"]
        recommendation.improvement_summary_text = obj["improvement-summary-text"]
        recommendation.improvement_descr_text = obj["improvement-descr-text"]
        recommendation.improvement_id = obj["improvement-id"]
        recommendation.improvement_id_text = obj["improvement-id-text"]
        recommendation.completed = False
        recommendation.cost = 0
        recommendation.date = ""
        recommendation.postcode = ""

        # Loop through completed recs in database to add additional information
        for rec in completed_set:
            if obj["improvement-id"] == rec.improvement_id:
                recommendation.completed = True
                recommendation.cost = rec.cost
                recommendation.date = rec.date
                recommendation.postcode = rec.postcode
                completed_set.remove(rec)
                break

        recommendations.append(recommendation)

    # Add additional completed recs not from API
    for rec in completed_set:
        recommendation = Recommendation()
        recommendation.lmk_key = lmk_key
        recommendation.improvement_item = ""
        recommendation.indicative_cost = ""
        recommendation.improvement_summary_text = ""
        recommendation.improvement_descr_text = ""
        recommendation.improvement_id = rec.improvement_id
        recommendation.improvement_id_text = ""
        recommendation.completed = True
        recommendation.cost = rec.cost
        recommendation.date = rec.date
        recommendation.postcode = rec.postcode
        recommendations.append(recommendation)

    return recommendations
