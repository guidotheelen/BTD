from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .models import Product


def serialize_product(product: Product) -> dict:
    return {
        "id": product.id,
        "slug": product.slug,
        "name": product.name,
        "description": product.description,
        "price": float(product.price),
        "badge": product.badge,
        "category": product.category,
        "image": product.image,
        "features": product.features or [],
    }


@require_GET
def product_list(request):
    """Return all products in a lightweight JSON shape for the frontend cart."""
    products = [serialize_product(product) for product in Product.objects.all()]
    return JsonResponse(
        {"products": products},
        headers={"Access-Control-Allow-Origin": "*"},
    )
