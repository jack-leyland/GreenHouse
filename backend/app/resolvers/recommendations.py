from app.types import Recommendation


def create_recommendations(data):
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
        recommendations.append(recommendation)
    return recommendations
