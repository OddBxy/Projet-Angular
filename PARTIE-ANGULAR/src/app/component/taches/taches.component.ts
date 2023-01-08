import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Liste, Tache } from 'src/app/model/tache';
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { json } from 'express';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  taches: Array<Tache> = [];
  newTache: Tache = {
    titre : '',
    termine : false,
    statut: ''
  };  

  UNDIFINED: Liste = {
    titre: 'UNDEFINED',
    statut:'',
    Taches: this.taches
  }

  ATTENTE: Liste = {
    titre: 'ATTENTE',
    statut: 'ATTENTE',
    Taches: this.taches
  }

  COURANT: Liste = {
    titre: 'EN COURS',
    statut: 'EN COURS',
    Taches: this.taches
  }

  TERMINE: Liste = {
    titre: 'TERMINE',
    statut: 'TERMINE',
    Taches: this.taches
  }

  listes: Array<Liste> = [ this.UNDIFINED, this.ATTENTE, this.COURANT, this.TERMINE]

  filter:string = 'Tous';

  constructor(private tacheService: TachesService,
    private userService: UserService,
    private router: Router){ }
  
  ngOnInit(): void {
    this.tacheService.getTaches().subscribe({
      next: (data:Array<Tache>) => { this.taches = data; }
    });

  }  
  ajouter(param:string) {
    this.newTache.statut =  param;
    this.tacheService.ajoutTaches(this.newTache).subscribe({
      next: (data) => {
        this.taches.push(data);
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
