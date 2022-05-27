import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../Entidades/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  constructor(private http:HttpClient) { }

  getListaHabilidades(): Observable<Habilidad[]>{
    return this.http.get<Habilidad[]>("https://portfolio-backend-srpingboot.herokuapp.com/ver/habilidades");
  }

  getHabilidad(id:String): Observable<any>{
    return this.http.get("https://portfolio-backend-srpingboot.herokuapp.com/ver/habilidad/"+id);
  }

  crearHabilidad(habilidad:Habilidad): Observable<any>{
    return this.http.post("https://portfolio-backend-srpingboot.herokuapp.com/new/habilidad",habilidad);
  }

  modificarHabilidad(habilidad:Habilidad): Observable<any>{
    console.log(habilidad);
    return this.http.put("https://portfolio-backend-srpingboot.herokuapp.com/modificar/habilidad",habilidad);
  }

  borrarHabilidad(id:number): Observable<any>{
    return this.http.delete("https://portfolio-backend-srpingboot.herokuapp.com/delete/habilidad/"+id);
  }

}
