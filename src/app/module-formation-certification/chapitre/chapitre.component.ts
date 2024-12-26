import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ChapitreService } from './chapitre-service/chapitre.service';

@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent implements OnInit {

  constructor(private chapitreService: ChapitreService, private route: Router,private router: ActivatedRoute) { }
  

  chapitreId: string | null = null;
  chapitre: any[] = [];
  section: any[] = [];
  chapitreFiltres: any[] = [];
  sectionFiltres:any[]=[]
  Contenus:any[]=[]
  ContenusFiltres:any[]=[]

  ngOnInit(): void {
    // Récupérer l'ID du domaine à partir de l'URL
    this.chapitreId = this.router.snapshot.paramMap.get('chapitreId');
    this.loadChapitres();
    this.loadContenu()
  }

  loadChapitres(): void {
    this.chapitreService.getChapitre().subscribe(data => {
      this.chapitre = data;
      this.loadSections(); // Filtrer les matières en fonction de l'ID du domaine
    });
  }

  loadSections(): void {
    this.chapitreService.getSection().subscribe(data => {
      this.section = data;
      console.log(".......", this.section)
      this.loadContenu();
    });
  }


  loadContenu(): void {
    this.chapitreService.getContenu().subscribe(data => {
      this.Contenus = data;
      this.filterData(); // Filtrer les matières en fonction de l'ID du domaine
    });
  }


  filterData(): void {
    if (this.chapitreId) {  
      this.chapitreFiltres = this.chapitre.filter(chapitre => chapitre.cours == this.chapitreId);
      this.sectionFiltres = this.section.filter(section => this.chapitreFiltres.some(chapitre =>chapitre.id==section.chapitre));
      this.ContenusFiltres = this.Contenus.filter(contenu => this.sectionFiltres.some(section=>section.id==contenu.section));
    }
  }

    



}
