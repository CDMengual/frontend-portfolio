import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../Entidades/persona';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient) { }

  getPersona(): Observable<any>{
    return this.http.get("https://portfolio-backend-srpingboot.herokuapp.com/ver/persona/1");
  }

  modificarDatosPersonales(persona:Persona): Observable<any>{
    return this.http.put("https://portfolio-backend-srpingboot.herokuapp.com/modificar/persona",persona);
  }
}
