from email.headerregistry import Group
from rest_framework import serializers

import Formation
<<<<<<< HEAD
from .models import Domaine,  Module, Cours, Chapitre, Contenu
=======
from .models import Domaine,  Module, Cours, Chapitre, Contenu, Video, Section
>>>>>>> 62a27e3a (Initial commit)

class DomaineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domaine
        fields =  '__all__' 

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'  # Including all necessary fields

class CoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cours
        fields =  '__all__'   # Including all necessary fields

class ChapitreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapitre
        fields =  '__all__'  # Including all necessary fields

<<<<<<< HEAD
=======

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields =  '__all__'   # Including all necessary fields


>>>>>>> 62a27e3a (Initial commit)
class ContenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contenu
        fields =  '__all__'   # Including all necessary fields

<<<<<<< HEAD
######################################################################################
        ############################################################################
=======

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields =  '__all__'   # Including all necessary fields


# class AudioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Audio
#         fields =  '__all__'   # Including all necessary fields


######################################################################################
############################################################################
>>>>>>> 62a27e3a (Initial commit)

from rest_framework import serializers
from .models import Webinar, WebinarEnrollment

class WebinarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webinar
        fields = '__all__'


class WebinarEnrollmentSerializer(serializers.ModelSerializer):
    webinar_title = serializers.CharField(source='webinar.title', read_only=True)  # Optionnel: pour afficher le titre du webinaire

    class Meta:
        model = WebinarEnrollment
        fields = '__all__'
