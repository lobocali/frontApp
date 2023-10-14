import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();
  private score: number | null = null;

  public url: string;
  public dataUsuarios: any;

  constructor(public _http:HttpClient){
    this.url = GLOBAL.url;
  }

  /**
   * Se consume endpoint para obtener usuarios
   * @param login
   * @author <Jhonny Cortes>
   */
  getUsers(login:string):Observable<any>{
    return this._http.get(this.url+'search/users',{params:{'q':login}});
  }

  /**
   * Se consume endpoint para obtener seguidores
   * @param url
   * @author <Jhonny Cortes>
   */
  getFollowers(url:string):Observable<any>{
    return this._http.get(url);
  }

  /**
   * Se consume endpoint para obtener usuario
   * @param login
   * @author <Jhonny Cortes>
   */
  getUser(login:string):Observable<any>{
    return this._http.get(this.url+'users/'+login);
  }

  /**
   * Set a variable score
   * @author <Jhonny Cortes>
   */
  setScoreUser(score:any){
    localStorage.setItem('score', score );
  }

  /**
   * get a variable score
   * @author <Jhonny Cortes>
   */
  getScoreUser(){
    return localStorage.getItem('score');
  }

}
