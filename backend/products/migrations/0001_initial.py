from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(unique=True)),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("price", models.DecimalField(decimal_places=2, max_digits=8)),
                ("badge", models.CharField(blank=True, max_length=255)),
                ("category", models.CharField(blank=True, max_length=120)),
                ("image", models.CharField(blank=True, max_length=255)),
                ("features", models.JSONField(blank=True, default=list)),
            ],
            options={"ordering": ["name"]},
        ),
    ]
