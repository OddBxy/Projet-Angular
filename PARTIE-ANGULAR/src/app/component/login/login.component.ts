import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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

  redirect():void{
    this.router.navigate(['signIn'])
  }

}
