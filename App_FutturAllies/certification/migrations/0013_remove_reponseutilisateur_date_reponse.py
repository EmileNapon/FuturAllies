# Generated by Django 4.2 on 2024-12-19 18:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('certification', '0012_remove_coursusecertification_chapitre_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reponseutilisateur',
            name='date_reponse',
        ),
    ]
