from django.contrib import admin
from django.urls import path

from products import views as product_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/products/", product_views.product_list, name="product-list"),
]
