import { Component, Input, OnInit } from "@angular/core";
import { CertificationService } from "../certification/certification-service/certificationService";
import { ActivatedRoute, Router } from "@angular/router";
import DOMPurify from 'dompurify';
import { AuthService } from "../../gestion-utilisateurs/connexion/service-connexion/service-connexion.service";

@Component({
    selector:'app-certification-contenu_chapitre',
    templateUrl:'./certification-contenu_chapitre.html',
    styleUrls:['./certification-contenu_chapitre.css']
})

export class certificationContenuChapitreComponent implements OnInit{

 


  currentIndex = 0;
  score = 0;
  passingScore = 5; // Score minimum requis pour valider
  totalQuestions = 0;
  missingQuestions: string[] = [];
  userAnswers: { [key: number]: string } = {};


  Invalid: boolean = true;
  certificatId: string | null = null;

  // ListCertificatChapitre: any[]=[]
  filtredCertificatCours:any[]=[]

  ListCertificat:any[]=[]
  filtredCertificat:any[]=[]

  coursUseCertification: any[]=[]
  filtreCoursUseCertification: any[]=[]

  cours: any[] = [];
  options: any[]=[]
  tri:any[]=[]

  ListCertificatChapitre:any[]=[]
  filtreListCertificatChapitre:any[]=[]
  certificatContenu:any[]=[]
  filtrecertificatContenu:any[]=[]


  isStatut:boolean=true
  isStatut2:boolean=false
  isStatut3:boolean=true
// declaration des variables de question-response

questions: any[] = [];
filtreQuestion:any[]=[]
reponses: { question: number; choix: number }[] = [];

 certificatId1: string | null = null;

  //---------------------------------//


  utilisateurId: number = 1; // Exemple d'ID utilisateur
  tauxDeSucces: number | null = null;
  bonnesReponses: number = 0;

  userInfo: { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null, id:string | null } | null = null;
  userId !:number 
  constructor(private serviceAuth: AuthService, private CertificatService:CertificationService, private router: Router, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.userInfo = this.serviceAuth.getUserInfo();
    this.userId= Number(this.userInfo?.id)
    this.certificatId = this.route.snapshot.paramMap.get('idCertificationContenuChapitre');
    this.getCertification()
    


    
}



    getCertification():void{
      this.CertificatService.getCertificat().subscribe(data => {
        this.ListCertificat = data;
        this.filtredCertificat = this.ListCertificat.filter(certificat=> certificat.id==this.certificatId);
        console.log('1111111',this.filtredCertificat)
        this.getCours()
      });

    }
   

  getCours(){
    this.CertificatService.getCours().subscribe(data => {
      this.cours = data;
      console.log('7777777777',this.cours)
      this.getCoursUseCertification()
    });
   
  }
  getCoursUseCertification(){
    this.CertificatService.getCoursUseCertification().subscribe(data => {
      this.coursUseCertification = data;
      console.log('2222222222222',this.coursUseCertification)
      this.getCoursUseCertification1()
    });
   
  }

  filtreCoursUseCertification1:any[]=[]

  getCoursUseCertification1(){
    
    this.filtreCoursUseCertification1 = this.coursUseCertification.filter(coursUseCertification=> coursUseCertification.certification==this.certificatId);
    this.filtreCoursUseCertification = this.filtreCoursUseCertification1.filter(coursUseCertification=>this.cours.some(cours=> cours.id==coursUseCertification.cours));
    console.log('cccccccccccc11',this.filtreCoursUseCertification)
    this.getCertificationChapitre()
  }

    
    getCertificationChapitre(){
      this.CertificatService.getChapitre().subscribe(data => {
        this.ListCertificatChapitre = data;
        this.filtreListCertificatChapitre = this.ListCertificatChapitre.filter(chapitre=> this.filtreCoursUseCertification.some(filtreCoursUseCertification=>filtreCoursUseCertification.cours==chapitre.cours));
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',this.filtreListCertificatChapitre)
        this.CertificatService.getContenu().subscribe(data => {
          this.certificatContenu = data;
          this.filtrecertificatContenu = this.certificatContenu.filter(contenu=> this.filtreListCertificatChapitre.some(filtreListCertificatChapitre=>filtreListCertificatChapitre.id==contenu.chapitre))
          //this.filtrecertificatContenu = this.certificatContenu.filter(contenu=>contenu.chapitre==this.certificatId)
          .map(contenu => {
            // Supprimer les balises <p> et </p> avant la sanitisation
            const descriptionSansP = contenu.description.replace(/<\/?p>/g, '');
            const sous_titreSansP = contenu.sous_titre.replace(/<\/?p>/g, '');
            return {
              ...contenu,sous_titre:DOMPurify.sanitize(sous_titreSansP),
              description: DOMPurify.sanitize(descriptionSansP)
            };
          });
          console.log('pppppppp',this.filtrecertificatContenu) 
          // Assurez-vous que les questions sont bien associées
          this.CertificatService.getQuestion().subscribe(data => {
            this.questions = data
            console.log('|||||||||||||||||||||||||||||||||||||', this.filtreListCertificatChapitre)  
            //this.filtreQuestion= this.questions.filter(question=>question.id==this.certificatId)
            this.filtreQuestion= this.questions.filter(question=>this.filtreListCertificatChapitre.some(chapitre=>chapitre.id==question.chapitre))
            this.tri=this.filtreQuestion;
            console.log('|||||||||||||||||||||||||||||||||||||', this.certificatId)  
            this.CertificatService.getOption().subscribe(data => {
              this.options = data
              console.log('|||||||||||||||||||||||||||||||||||||', this.filtreQuestion,'................')  

            });
  
          });

        

        });
      });
  
      
    }

        // chargement des questions et reponse

        selectOption(questionId: number, optionId: number): void {
          const index = this.reponses.findIndex(r => r.question === questionId);
          if (index !== -1) {
            this.reponses[index].choix = optionId;
          } else {
            this.reponses.push({ question: questionId, choix: optionId });
          }
          console.log('nnnnnnnnnnnnnnnnnnnnnnnn',this.reponses)
          
          
        }
      

        



resultat: any;


        submitReponses(): void {
          const utilisateurId = 1;
          const chapitreId = 1;
          
          this.CertificatService.postReponses(utilisateurId,chapitreId,this.reponses).subscribe(result => {
            this.resultat=result
            console.log('Résultat:', result.score.chapitre);
            this.score = result.score.score; // Récupère le score
          });
          this.isStatut=!this.isStatut
          
        }








fetchTauxSucces(): void {
  this.CertificatService.postReponses(this.userId, 1, this.reponses).subscribe({
    next: (reponse) => {
      this.tauxDeSucces = reponse.tauxDeSucces;
      console.log('Taux de succès récupéré :', reponse.tauxDeSucces);
    },
    error: (err) => {
      console.error('Erreur lors de la récupération du taux de succès:', err);
    }
  });
}

      

      




nextChapter() {
  if (this.currentIndex < this.filtreListCertificatChapitre.length - 1) {
    this.currentIndex++;
  }
  this.isStatut=true
  this.isStatut2=false
}

// Obtenir le chapitre actuel
get currentChapitre() {
  return this.filtreListCertificatChapitre[this.currentIndex];
}

prevChapter() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
  }
  this.isStatut=!this.isStatut
  this.isStatut2=!this.isStatut2
}


  // Vérifier si le score est suffisant pour activer le bouton "Continuer"
  get canContinue() {
    return this.score >= 70;
  }

  // Obtenir le texte du bouton "Retour/Reprendre"
  get prevButtonText() {
    return this.score < 70 ? 'Reprendre' : 'Retour';
  }



  
 



  allQuestionsAnswered(): boolean {
    // Sélectionner le conteneur du chapitre courant
    const chapitreContainer = document.querySelector(`section.course-details > div:nth-child(${this.currentIndex + 1})`);
    if (!chapitreContainer) {
      return false; // Si le conteneur n'existe pas, retourne false
    }
  
    // Récupérer toutes les questions (inputs radio) dans le chapitre courant
    const questionElements = chapitreContainer.querySelectorAll('input[type="radio"]');
  
    // Extraire les noms uniques des questions pour vérifier si chaque question a une réponse cochée
    const questionNames = new Set<string>();
    questionElements.forEach((element: Element) => {
      const name = (element as HTMLInputElement).name;
      questionNames.add(name);
    });
  
    // Vérifier si toutes les questions ont une réponse cochée
    const allAnswered = Array.from(questionNames).every(name => {
      const checkedElement = chapitreContainer.querySelector(`input[name="${name}"]:checked`);
      return !!checkedElement; // Vérifie si une réponse est sélectionnée pour chaque question
    });
  
    return allAnswered;
  }
  


 }
