# Generated by Django 4.0.3 on 2022-04-09 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_product_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
