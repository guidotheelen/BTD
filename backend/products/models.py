from django.db import models


class Product(models.Model):
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    badge = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=120, blank=True)
    image = models.CharField(max_length=255, blank=True)
    features = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name
