from django.db import models

# Create your models here.
class CompletedRecommendation(models.Model):
    class Meta:
        verbose_name = "Completed Recommendation"

    lmk_key = models.CharField(primary_key=True, max_length=200)
    improvement_id = models.CharField(max_length=200)
    date = models.CharField(max_length=200)
    cost = models.FloatField()
