import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url="https://portfolio-backend-srpingboot.herokuapp.com/login";

  currentUserSubject: BehaviorSubject<any>;

  constructor(private http:HttpClient) {
    this.currentUserSubject=new BehaviorSubject<any>
    (JSON.parse(sessionStorage.getItem('currentUser')!))
    console.log(this.UsuarioAutenticado)
  }

  IniciarSesion(credenciales:any):Observable<any>{

    return this.http.post(this.url, credenciales).pipe(map(data=>{
      console.log(data);
      if(data){
        sessionStorage.setItem('currentUser',JSON.stringify(data));
        this.currentUserSubject.next(data);
        return true;
      }
      else{
        return false;
      }
    }))
  }

  cerrarSesion():void{
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

  }

  get UsuarioAutenticado(){
    return this.currentUserSubject.value;
  }


}
