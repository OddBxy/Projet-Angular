import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';
import { Liste } from 'src/app/model/liste';
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { json } from 'express';
import { __param } from 'tslib';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  taches: Array<Tache> = [];
  listes: Array<Liste> = []
  selecteurTemporaire: Tache[] = [];
 
  newTache: Tache = {
    titre : '',
    termine : false,
    statut: ''
  };  

  newListe: Liste = {
    titre: '',
    statut: '',
    Taches: this.taches
  }

  selectTaches(param:string){
    this.selecteurTemporaire = [];
    this.taches.forEach(elem => {
      if (elem.statut == param) {
        this.selecteurTemporaire.push(elem)
      }
    })
    return this.selecteurTemporaire
  }

  filter:string = 'Tous';

  constructor(private tacheService: TachesService,
    private userService: UserService,
    private router: Router){ }
  
  ngOnInit(): void {
    this.tacheService.getTaches().subscribe({
      next: (data:Array<Tache>) => { 
        this.taches = data;
      }
    });
    this.tacheService.getListes().subscribe({
      next: (data) => {
        this.listes = data
      }
    })    
  }  


  ajouterListe(){
    this.newListe.statut = this.newListe.titre;
    this.newListe.Taches = []
    this.tacheService.ajoutListes(this.newListe).subscribe({
      next: (data) => {
        this.listes.push(data)
      }
    });
  }

  supprimerListe(liste: Liste){
    liste.Taches.forEach(element => {
      this.supprimer(element);
    });
    this.listes = this.listes.filter(l => liste.titre != l.titre)
  }


  ajouter(liste: Liste) {
    this.newTache.statut = liste.statut;
    this.tacheService.ajoutTaches(this.newTache).subscribe({
      next: (data) => {
        this.taches.push(data);
        liste.Taches.push(data)
        console.log(liste.Taches)
        this.tacheService.updateListes(liste).subscribe({
          next: (data) => {
          }
        })
      }
    });   
  } 

  supprimer(tache: Tache): void {
    this.tacheService.removeTaches(tache).subscribe({
      next: (data) => {
        this.taches = this.taches.filter(t => tache._id != t._id);
      }
    });

  }

  modifier(tache: Tache) {
    tache.termine = !tache.termine;
    this.tacheService.updateTaches(tache).subscribe({
      next: (data) => {
      }
    });
  }

  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }

  change(filter:string) {
    this.filter = filter;
  }

  drop(event: CdkDragDrop<string[]>, statut:string) {
    
    var tache: Tache = {
      _id: event.item.data._id,
      titre: event.item.data.titre,
      termine: false,
      statut:''
    }
    
    event.item.data.statut = statut
    tache.statut = statut
    this.tacheService.updateTaches(tache).subscribe({
      next: (data) => {
      }
    });
      
  
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    
  }
}