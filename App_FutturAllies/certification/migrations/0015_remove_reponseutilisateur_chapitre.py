# Generated by Django 4.2 on 2024-12-23 10:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('certification', '0014_reponseutilisateur_chapitre'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reponseutilisateur',
            name='chapitre',
        ),
    ]
