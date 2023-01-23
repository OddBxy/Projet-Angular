import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class signInComponent {
  error: boolean = false;
  user: User = {
    login: '', 
    password: '',
    listes: []
  };

  constructor(private userService: UserService, private router: Router) {

  }


  submit():void {
      this.userService.login(this.user).subscribe({
        next: () => { this.router.navigate(['taches'], {queryParams: {login : this.user.login}}) }, //on envoie juste le login pour ne pas afficher le mdp 
        error: () => { this.error = true; }
      });
  }

  signIn(){
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        data.forEach(element => {
          if(this.user.login == element.login){
            this.error = true;
          }   
        });
        if (this.error != true) {
          this.userService.signIn(this.user).subscribe({
            next: () =>{this.submit() }
          });        
        }
      }
    })
  }

}
