from app.types import Recommendation


def create_recommendations(data, completed):
    recommendations = []

    for obj in data:
        recommendation = Recommendation()
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

        # Loop through completed recs to see if completed
        for recs in completed:
            if obj["improvement-id"] == recs.improvement_id:
                recommendation.completed = True
                recommendation.cost = recs.cost
                recommendation.date = recs.date
                recommendation.postcode = recs.postcode
                break

        recommendations.append(recommendation)
    return recommendations
