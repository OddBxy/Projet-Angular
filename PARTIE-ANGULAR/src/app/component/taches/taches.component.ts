import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';
import { Liste } from 'src/app/model/liste';
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { json, query } from 'express';
import { __param } from 'tslib';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  taches: Array<Tache> = [];
  listes: Array<Liste> = [];
  selecteurTemporaire: Tache[] = [];

  user : User = {
    login: '',
    password: '',
    listes: []
  };
 
  newTache: Tache = {
    titre : '',
    termine : false,
    statut: ''
  };  

  newListe: Liste = {
    titre: '',
    statut: '',
    Taches: []
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
    /*this.tacheService.getListes().subscribe({
      next: (data2:Array<Liste>) => {
        this.listes = data2;
      }
    })*/
    let param = location.search.substring(1).split('=') //car substring : login="qqchose"
    this.user.login = param[1]
    this.userService.getUser(this.user).subscribe({
      next: (data3: Array<User>) => {
        this.user = data3[0]; //dans l'api, la fonction renvoie un tableau
        this.listes = this.user.listes
      }
    })
  }  


  ajouterListe(){
    this.newListe.statut = this.newListe.titre;
    //this.listes.push(this.newListe)
    this.user.listes.push(this.newListe)
    this.userService.updateUser(this.user).subscribe({
      next: (data) => {
        this.ngOnInit();
      }
    });
  }

  supprimerListe(liste: Liste){
   // this.tacheService.deleteListes(liste).subscribe({ next: (data) => {} });
    this.ngOnInit();
  }


  ajouter(liste: Liste) {
    this.newTache.statut = liste.statut;
    liste.Taches.push(this.newTache);
    this.userService.updateUser(this.user).subscribe({
      next: (data) => {this.ngOnInit()}
    }) 
  } 

  supprimer(tache: Tache, liste: Liste): void {
    let index = liste.Taches.indexOf(tache);
    liste.Taches.splice(index, 1);
    this.userService.updateUser(this.user).subscribe({
      next: () => {this.ngOnInit()}
    })
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

  drop(event: CdkDragDrop<string[]>, liste:Liste) {
    var tache: Tache = {
      _id: event.item.data._id,
      titre: event.item.data.titre,
      termine: false,
      statut: event.item.data.statut
    }
    //on enelve la tache de l'ancienne liste
    this.user.listes.forEach( element => {
      if (element.statut == tache.statut) {
        let index = element.Taches.indexOf(tache)
        element.Taches.splice(index, 1)
      }
    })

    //on met à jour ses informations 
    event.item.data.statut = liste.statut
    tache.statut = liste.statut

    //on met à jour la bdd
    liste.Taches.push(tache);
    this.userService.updateUser(this.user).subscribe({
      next: () => { this.ngOnInit()}
    })
      
  
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    
  }
}