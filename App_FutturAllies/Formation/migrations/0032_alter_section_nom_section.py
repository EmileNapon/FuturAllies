# Generated by Django 4.2 on 2024-12-26 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Formation', '0031_remove_section_chapitre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='nom_section',
            field=models.TextField(),
        ),
    ]