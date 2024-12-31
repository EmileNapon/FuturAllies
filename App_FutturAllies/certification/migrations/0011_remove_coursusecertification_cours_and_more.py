# Generated by Django 4.2 on 2024-12-17 15:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Formation', '0021_alter_webinarenrollment_unique_together'),
        ('certification', '0010_reponseutilisateur'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coursusecertification',
            name='cours',
        ),
        migrations.AddField(
            model_name='coursusecertification',
            name='chapitre',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='certifications_courses', to='Formation.chapitre'),
        ),
    ]
