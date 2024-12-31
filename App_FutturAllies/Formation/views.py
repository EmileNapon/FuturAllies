
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

<<<<<<< HEAD
from Formation.models import Domaine, Module, Cours, Chapitre,Contenu
from .serializers import ChapitreSerializer, ContenuSerializer, CoursSerializer, DomaineSerializer, ModuleSerializer, WebinarEnrollmentSerializer
=======
from Formation.models import Domaine, Module, Cours, Chapitre,Contenu, WebinarEnrollment, Section
from .serializers import ChapitreSerializer, ContenuSerializer, CoursSerializer, DomaineSerializer, ModuleSerializer, WebinarEnrollmentSerializer, SectionSerializer
>>>>>>> 62a27e3a (Initial commit)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
###################################################################################################
@api_view(['POST'])
def create_domaine(request):
    if request.method == 'POST':
        serializer = DomaineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Permet seulement aux utilisateurs authentifiés de lister les offres
def list_domaines(request):
    domaines = Domaine.objects.all()  # Récupérer toutes les offres
    serializer = DomaineSerializer(domaines, many=True)  # Sérialiser les données
    return Response(serializer.data, status=status.HTTP_200_OK)


###################################################################################################
@api_view(['POST'])
def create_module(request):
    if request.method == 'POST':
        serializer = ModuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Permet seulement aux utilisateurs authentifiés de lister les offres
def list_modules(request):
    modules = Module.objects.all()  # Récupérer toutes les offres
    serializer = ModuleSerializer(modules, many=True)  # Sérialiser les données
    return Response(serializer.data, status=status.HTTP_200_OK)

###################################################################################################

@api_view(['POST'])
def create_cours(request):
    if request.method == 'POST':
        serializer = CoursSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
<<<<<<< HEAD
@permission_classes([IsAuthenticated])  # Permet seulement aux utilisateurs authentifiés de lister les offres
=======
# @permission_classes([IsAuthenticated])  # Permet seulement aux utilisateurs authentifiés de lister les offres
>>>>>>> 62a27e3a (Initial commit)
def list_cours(request):
    cours= Cours.objects.all()  # Récupérer toutes les offres
    serializer = CoursSerializer(cours, many=True)  # Sérialiser les données
    return Response(serializer.data, status=status.HTTP_200_OK)

###################################################################################################
@api_view(['POST'])
def create_chapitre(request):
    if request.method == 'POST':
        serializer = ChapitreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Permet seulement aux utilisateurs authentifiés de lister les offres
def list_chapitres(request):
    chapitre= Chapitre.objects.all()  # Récupérer toutes les offres
    serializer = ChapitreSerializer(chapitre, many=True)  # Sérialiser les données
<<<<<<< HEAD
=======
    print(list_chapitres)
>>>>>>> 62a27e3a (Initial commit)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
###################################################################################################

<<<<<<< HEAD
=======
@api_view(['POST'])
def create_section(request):
    if request.method == 'POST':
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
# @permission_classes([IsAuthenticated])  # Permet seulement aux utilisateurs authentifiés de lister les offres
def list_section(request):
    section= Section.objects.all()  # Récupérer toutes les offres
    serializer = SectionSerializer(section, many=True)  # Sérialiser les données
    return Response(serializer.data, status=status.HTTP_200_OK)

###################################################################################################
>>>>>>> 62a27e3a (Initial commit)

@api_view(['POST'])
def create_contenu(request):
    if request.method == 'POST':
        serializer = ContenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
<<<<<<< HEAD
@permission_classes([IsAuthenticated])  # Permet seulement aux utilisateurs authentifiés de lister les offres
=======
# @permission_classes([IsAuthenticated])  # Permet seulement aux utilisateurs authentifiés de lister les offres
>>>>>>> 62a27e3a (Initial commit)
def list_contenus(request):
    contenu= Contenu.objects.all()  # Récupérer toutes les offres
    serializer = ContenuSerializer(contenu, many=True)  # Sérialiser les données
    return Response(serializer.data, status=status.HTTP_200_OK)
###################################################################################################


#####################################################################  modification     

class ContentView(APIView):
    def get(self, request, contenu_id):
        contenu = get_object_or_404(Contenu, id=contenu_id)
        serializer = ContenuSerializer(contenu)
        return Response(serializer.data)

    def put(self, request):
        updated_data = []
        for contenu_data in request.data:
            contenu_id = contenu_data.get('id')
            if contenu_id is None:
                return Response({"error": "Chaque contenu doit avoir un champ ID."}, status=status.HTTP_400_BAD_REQUEST)
            contenu = get_object_or_404(Contenu, id=contenu_id)
            serializer = ContenuSerializer(contenu, data=contenu_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                updated_data.append(serializer.data)  
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(updated_data, status=status.HTTP_200_OK)

#####################################################################  modification     

class ChapitreView(APIView):
    def get(self, request, chapitre_id):
        chapitre = get_object_or_404(Chapitre, id=chapitre_id)
        serializer = ChapitreSerializer(chapitre)
        return Response(serializer.data)





##############################################################################################
##############################################################################################
    

from .models import Webinar
from .serializers import WebinarSerializer

# Liste des webinaires (GET /fapi/webinars/)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_webinars(request):
    webinars = Webinar.objects.all()
    serializer = WebinarSerializer(webinars, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Détails d'un webinaire (GET /fapi/webinars/<webinar_id>/)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_webinar_detail(request, webinar_id):
    try:
        webinar = Webinar.objects.get(pk=webinar_id)
    except Webinar.DoesNotExist:
        return Response({"error": "Webinar not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = WebinarSerializer(webinar)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Création d'un webinaire (POST /fapi/webinars/create/)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_webinar(request):
    serializer = WebinarSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Mise à jour d'un webinaire (PUT /fapi/webinars/<webinar_id>/update/)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_webinar(request, webinar_id):
    try:
        webinar = Webinar.objects.get(pk=webinar_id)
    except Webinar.DoesNotExist:
        return Response({"error": "Webinar not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = WebinarSerializer(webinar, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Suppression d'un webinaire (DELETE /fapi/webinars/<webinar_id>/delete/)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_webinar(request, webinar_id):
    try:
        webinar = Webinar.objects.get(pk=webinar_id)
<<<<<<< HEAD
=======
      
>>>>>>> 62a27e3a (Initial commit)
    except Webinar.DoesNotExist:
        return Response({"error": "Webinar not found"}, status=status.HTTP_404_NOT_FOUND)

    webinar.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

<<<<<<< HEAD

@api_view(['POST'])
def enroll_to_webinar(request):
    serializer = WebinarEnrollmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # Sauvegarder l'inscription
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
=======
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .models import WebinarEnrollment, CustomUser
from .serializers import WebinarEnrollmentSerializer

@api_view(['POST'])
def enroll_to_webinar(request):
    # Sérialiser les données de l'inscription
    serializer = WebinarEnrollmentSerializer(data=request.data)
    
    if serializer.is_valid():
        # Récupérer le webinaire et l'ID de l'utilisateur
        webinar = serializer.validated_data['webinarId']
        user_id = request.data.get('user')  # Récupérer l'ID de l'utilisateur
        
        # Vérifier si l'utilisateur existe
        try:
            # Assurez-vous que l'utilisateur existe et récupérez-le
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {"message": "L'utilisateur spécifié n'existe pas."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Vérifier si l'utilisateur est déjà inscrit à ce webinaire
        if WebinarEnrollment.objects.filter(user=user, webinarId=webinar).exists():
            return Response(
                {"message": f"L'utilisateur {user.nom} est déjà inscrit à ce webinaire."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Sauvegarder l'inscription avec l'objet utilisateur
        serializer.save(user=user)

        # # Envoi de l'email de confirmation
        # try:
        #     send_mail(
        #         subject=f"Confirmation d'inscription : {webinar.title}",
        #         message=(
        #             ##f"Bonjour {user.first_name},\n\n"
        #             f"Votre inscription au webinaire '{webinar.title}' a été confirmée !\n\n"
        #             f"Détails :\n"
        #             f"- Date et heure : {webinar.startDateTime}\n"
        #             f"- Durée : {webinar.duree}\n"
        #             f"- Lien du webinaire : {webinar.webinarUrl}\n\n"
        #             f"Merci de votre participation !\n\n"
        #             f"L'équipe FuturAllies"
        #         ),
        #         from_email=settings.EMAIL_HOST_USER,
        #         recipient_list=[user.email],  # Utilisation de l'email de l'utilisateur
        #         fail_silently=False,
        #     )
        # except Exception as e:
        #     return Response(
        #         {"message": "Inscription réussie, mais l'email de confirmation n'a pas pu être envoyé.",
        #          "data": serializer.data},
        #         status=status.HTTP_201_CREATED
        #     )

        # return Response(
        #     {"message": "Inscription réussie. Un email de confirmation a été envoyé.", "data": serializer.data},
        #     status=status.HTTP_201_CREATED
        # )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# import base64
# import google.auth.transport.requests
# from google.oauth2.credentials import Credentials
# from google.auth.transport.requests import Request
# from django.core.mail import EmailMessage

# def get_gmail_access_token():
#     credentials = Credentials.from_authorized_user_info(
#         info={
#             "client_id": settings.GOOGLE_CLIENT_ID,
#             "client_secret": settings.GOOGLE_CLIENT_SECRET,
#             "refresh_token": settings.GOOGLE_REFRESH_TOKEN,
#             "token": None,
#         },
#         scopes=["https://mail.google.com/"]
#     )
#     credentials.refresh(Request())
#     return credentials.token



# @api_view(['POST'])
# def enroll_to_webinar(request):
#     # Sérialiser les données de l'inscription
#     serializer = WebinarEnrollmentSerializer(data=request.data)
    
#     if serializer.is_valid():
#         # Récupérer le webinaire et l'ID de l'utilisateur
#         webinar = serializer.validated_data['webinarId']
#         user_id = request.data.get('user')  # Récupérer l'ID de l'utilisateur
        
#         # Vérifier si l'utilisateur existe
#         try:
#             # Assurez-vous que l'utilisateur existe et récupérez-le
#             user = CustomUser.objects.get(id=user_id)
#         except CustomUser.DoesNotExist:
#             return Response(
#                 {"message": "L'utilisateur spécifié n'existe pas."},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Vérifier si l'utilisateur est déjà inscrit à ce webinaire
#         if WebinarEnrollment.objects.filter(user=user, webinarId=webinar).exists():
#             return Response(
#                 {"message": f"L'utilisateur {user.nom} est déjà inscrit à ce webinaire."},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
        
#         # Sauvegarder l'inscription avec l'objet utilisateur
#         serializer.save(user=user)

#         # Envoi de l'email de confirmation
#         try:
#             access_token = get_gmail_access_token()
#             email = EmailMessage(
#                 subject=f"Confirmation d'inscription : {webinar.title}",
#                 body=(
#                     f"Bonjour {user.first_name},\n\n"
#                     f"Votre inscription au webinaire '{webinar.title}' a été confirmée !\n\n"
#                     f"Détails :\n"
#                     f"- Date et heure : {webinar.startDateTime}\n"
#                     f"- Durée : {webinar.duree}\n"
#                     f"- Lien du webinaire : {webinar.webinarUrl}\n\n"
#                     f"Merci de votre participation !\n\n"
#                     f"L'équipe FuturAllies"
#                 ),
#                 from_email=settings.EMAIL_HOST_USER,
#                 to=[user.email],
#             )
#             email.extra_headers = {"Authorization": f"Bearer {access_token}"}
#             email.send(fail_silently=False)

#         except Exception as e:
#             return Response(
#                 {"message": "Inscription réussie, mais l'email de confirmation n'a pas pu être envoyé.",
#                  "data": serializer.data},
#                 status=status.HTTP_201_CREATED
#             )

#         return Response(
#             {"message": "Inscription réussie. Un email de confirmation a été envoyé.", "data": serializer.data},
#             status=status.HTTP_201_CREATED
#         )

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
>>>>>>> 62a27e3a (Initial commit)
