# Generated by Django 4.0.3 on 2022-04-09 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_rename_qty_orderitem_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='countInStock',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
    ]
