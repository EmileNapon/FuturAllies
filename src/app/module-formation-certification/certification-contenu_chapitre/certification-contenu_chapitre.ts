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


  cours: any[] = [];
  options: any[]=[]
  tri:any[]=[]




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


certificats:any[]=[]
filtredCertificat:any[]=[]
    getCertification():void{
      this.CertificatService.getCertificat().subscribe(data => {
        this.certificats = data;
        this.filtredCertificat = this.certificats.filter(certificat=> certificat.id==this.certificatId);
        console.log('1111111',this.filtredCertificat)
        this.getCours()
      });

    }
   

  getCours(){
    this.CertificatService.getCours().subscribe(data => {
      this.cours = data;
      console.log('2222222',this.cours)
      this.loadChapitre()
    });
   
  }
chapitres:any[]=[]
  loadChapitre(): void {
    this.CertificatService.getChapitre().subscribe(data => {
      this.chapitres = data;
      console.log('333333333',this.chapitres)
      this.loadSections();
    });
  } 

  sections:any[]=[]
  loadSections(): void {
    this.CertificatService.getSection().subscribe(data => {
      this.sections = data;
      console.log('444444444444444444444',this.sections)
      this.loadContenu();
    });
  }
  contenus:any[]=[]
  loadContenu(): void {
    this.CertificatService.getContenu().subscribe(data => {
      this.contenus = data;
      console.log('555555555555555555555',this.contenus)
      this.getCoursUseCertification()
    });
  }


  coursUseCertifications:any[]=[]
  getCoursUseCertification(){
    this.CertificatService.getCoursUseCertification().subscribe(data => {
      this.coursUseCertifications = data;
      console.log('666666666666666666666',this.coursUseCertifications)
      this.getCoursUseCertificationFiltre()
    });
   
  }

  filtreCoursUseCertifications:any[]=[]
  filtreCours:any[]=[]
  filtreListCertificatSection:any[]=[]
  filtreChapitre:any[]=[]
  filtreSection:any[]=[]
  filtreContenu:any[]=[]


  getCoursUseCertificationFiltre(){

    this.filtreCoursUseCertifications = this.coursUseCertifications.filter(coursUseCertification=> coursUseCertification.certification==this.certificatId);
    console.log('7777777',this.filtreCoursUseCertifications)
    this.filtreCours = this.cours.filter(cours=>this.filtreCoursUseCertifications.some(filtreCoursUseCertification=> cours.id==filtreCoursUseCertification.cours));
    console.log('88888888',this.filtreCours)
    this.filtreChapitre = this.chapitres.filter(chapitre=> this.filtreCours.some(filtreCours=>chapitre.cours==filtreCours.id));
    console.log('99999999',this.filtreChapitre)
    this.filtreSection = this.sections.filter(section=> this.filtreChapitre.some(filtreChapitre=>section.chapitre==filtreChapitre.id));
    console.log('10101010101',this.filtreSection)
    this.filtreContenu = this.contenus.filter(contenus=> this.filtreSection.some(filtreSection=>contenus.section==filtreSection.id));
    console.log('11111111111111111111--',this.filtreContenu)
    this.getQuestion()
  }


getQuestion(){
    this.CertificatService.getQuestion().subscribe(data => {
      this.questions = data
      console.log('|||||||||||||||||||||||||||||||||||||', this.filtreChapitre)  
      //this.filtreQuestion= this.questions.filter(question=>question.id==this.certificatId)
      this.filtreQuestion= this.questions.filter(question=>this.filtreChapitre.some(chapitre=>chapitre.id==question.chapitre))
      this.tri=this.filtreQuestion;
      console.log('|||||||||||||||||||||||||||||||||||||', this.certificatId)  
      this.CertificatService.getOption().subscribe(data => {
      this.options = data
      console.log('|||||||||||||||||||||||||||||||||||||', this.filtreQuestion,'................')  

    });
  });

}
    
    // getCertificationChapitre(){
    //   this.CertificatService.getChapitre().subscribe(data => {
    //     this.ListCertificatChapitre = data;
    //     this.filtreListCertificatChapitre = this.ListCertificatChapitre.filter(chapitre=> this.filtreCoursUseCertification.some(filtreCoursUseCertification=>filtreCoursUseCertification.cours==chapitre.cours));
    //     console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',this.filtreListCertificatChapitre)
    //     this.CertificatService.getContenu().subscribe(data => {
    //       this.certificatContenu = data;
    //       this.filtrecertificatContenu = this.certificatContenu.filter(contenu=> this.filtreListCertificatChapitre.some(filtreListCertificatChapitre=>filtreListCertificatChapitre.id==contenu.chapitre))
    //       //this.filtrecertificatContenu = this.certificatContenu.filter(contenu=>contenu.chapitre==this.certificatId)
    //       .map(contenu => {
    //         // Supprimer les balises <p> et </p> avant la sanitisation
    //         const descriptionSansP = contenu.description.replace(/<\/?p>/g, '');
    //         const sous_titreSansP = contenu.sous_titre.replace(/<\/?p>/g, '');
    //         return {
    //           ...contenu,sous_titre:DOMPurify.sanitize(sous_titreSansP),
    //           description: DOMPurify.sanitize(descriptionSansP)
    //         };
    //       });
    //       console.log('pppppppp',this.filtrecertificatContenu) 
    //       // Assurez-vous que les questions sont bien associées
    //       this.CertificatService.getQuestion().subscribe(data => {
    //         this.questions = data
    //         console.log('|||||||||||||||||||||||||||||||||||||', this.filtreListCertificatChapitre)  
    //         //this.filtreQuestion= this.questions.filter(question=>question.id==this.certificatId)
    //         this.filtreQuestion= this.questions.filter(question=>this.filtreListCertificatChapitre.some(chapitre=>chapitre.id==question.chapitre))
    //         this.tri=this.filtreQuestion;
    //         console.log('|||||||||||||||||||||||||||||||||||||', this.certificatId)  
    //         this.CertificatService.getOption().subscribe(data => {
    //           this.options = data
    //           console.log('|||||||||||||||||||||||||||||||||||||', this.filtreQuestion,'................')  

    //         });
  
    //       });

        

    //     });
    //   });
  
      
    // }

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
  if (this.currentIndex < this.filtreChapitre.length - 1) {
    this.currentIndex++;
  }

}

// Obtenir le chapitre actuel
get currentChapitre() {
  return this.filtreChapitre[this.currentIndex];
}

prevChapter() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
  }

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
