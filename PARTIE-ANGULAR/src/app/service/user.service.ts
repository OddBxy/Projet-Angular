import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<void>  {
    return this.http.post<void>(this.url, user, { withCredentials: true });
  }

  logout():Observable<void> {
    return this.http.post<void>('http://localhost:3000/logout', {}, { withCredentials: true });
  }
  
  isConnected(): Observable<void> {
    return this.http.get<void>('http://localhost:3000/isConnected', { withCredentials: true });
  }

  signIn(user: User): Observable<void>{
    return this.http.post<void>('http://localhost:3000/signin', user, {withCredentials :true })
  }

  getUser(login :User): Observable<Array<User>>{
    return this.http.post<Array<User>>('http://localhost:3000/getUser',login, {withCredentials :true }) 
    //post pour envoiyer un user, si on utilise get il faut envoyer le login en parametre mais on peut pas utiliser find avec req.params
  }
  getAllUsers(): Observable<Array<User>>{
    return this.http.get<Array<User>>('http://localhost:3000/getAllUsers', {withCredentials :true }) 
  }


  updateUser(user: User):Observable<User> {
    return this.http.put<User>('http://localhost:3000/updateUser/'+user._id, user,{withCredentials:true});
  }

}