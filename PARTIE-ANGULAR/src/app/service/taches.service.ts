import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../model/tache';
import { Liste } from '../model/liste';

@Injectable({
  providedIn: 'root'
})
export class TachesService {
  private url:string = 'http://localhost:3000/taches/';
  private url2:string = 'http://localhost:3000/listes/';

  constructor(private http: HttpClient) { }

  getTaches():Observable<Array<Tache>> {
    return this.http.get<Array<Tache>>(this.url, {withCredentials:true});
  }

  ajoutTaches(tache:Tache):Observable<Tache> {
    return this.http.post<Tache>(this.url,tache, {withCredentials:true});
  }

  updateTaches(tache:Tache):Observable<Tache> {
    return this.http.put<Tache>(this.url+tache._id, tache, {withCredentials:true});
  }

  removeTaches(tache:Tache):Observable<Tache> {
    return this.http.delete<Tache>(this.url+tache._id, {withCredentials:true});
  }


  getListes():Observable<Array<Liste>> {
    return this.http.get<Array<Liste>>(this.url2, {withCredentials:true});
  }

  ajoutListes(liste:Liste):Observable<Liste> {
    return this.http.post<Liste>(this.url2,liste, {withCredentials:true});
  }

  updateListes(liste:Liste):Observable<Liste> {
    console.log(liste)
    return this.http.put<Liste>(this.url2+liste._id, liste, {withCredentials:true});
  }
  
}
