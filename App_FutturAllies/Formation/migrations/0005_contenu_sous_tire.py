# Generated by Django 4.2.15 on 2024-10-23 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Formation', '0004_alter_contenu_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='contenu',
            name='sous_tire',
            field=models.CharField(default='', max_length=800),
        ),
    ]
