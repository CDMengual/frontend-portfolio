import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../Entidades/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http:HttpClient) { }

  getListaExperiencias(): Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>("https://portfolio-backend-srpingboot.herokuapp.com/ver/experiencias");
  }

  getExperiencia(id:String): Observable<any>{
    return this.http.get("https://portfolio-backend-srpingboot.herokuapp.com/ver/expriencia/"+id);
  }

  crearExperiencia(experiencia:Experiencia): Observable<any>{
    return this.http.post("https://portfolio-backend-srpingboot.herokuapp.com/new/experiencia",experiencia);
  }

  modificarExperiencia(experiencia:Experiencia): Observable<any>{
    console.log(experiencia);
    return this.http.put("https://portfolio-backend-srpingboot.herokuapp.com/modificar/experiencia",experiencia);
  }

  borrarExperiencia(id:number): Observable<any>{
    return this.http.delete("https://portfolio-backend-srpingboot.herokuapp.com/delete/experiencia/"+id);
  }

}

