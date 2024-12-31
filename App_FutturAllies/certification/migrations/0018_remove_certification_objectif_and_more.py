# Generated by Django 4.2 on 2024-12-30 11:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Formation', '0034_rename_chapitres_section_chapitre'),
        ('certification', '0017_alter_coursusecertification_cours_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='certification',
            name='objectif',
        ),
        migrations.RemoveField(
            model_name='certification',
            name='prerequisites',
        ),
        migrations.CreateModel(
            name='prerequisites',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certification', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='certification.certification')),
                ('chapitre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Formation.chapitre')),
            ],
        ),
    ]