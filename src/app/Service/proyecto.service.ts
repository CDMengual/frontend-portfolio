import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../Entidades/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http:HttpClient) { }

  getListaProyectos(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>("https://portfolio-backend-srpingboot.herokuapp.com/ver/proyectos");
  }

  getProyecto(id:String): Observable<any>{
    return this.http.get("https://portfolio-backend-srpingboot.herokuapp.com/ver/proyecto/"+id);
  }

  crearProyecto(proyecto:Proyecto): Observable<any>{
    return this.http.post("https://portfolio-backend-srpingboot.herokuapp.com/new/proyecto",proyecto);
  }

  modificarProyecto(proyecto:Proyecto): Observable<any>{
    console.log(proyecto);
    return this.http.put("https://portfolio-backend-srpingboot.herokuapp.com/modificar/proyecto",proyecto);
  }

  borrarProyecto(id:number): Observable<any>{
    return this.http.delete("https://portfolio-backend-srpingboot.herokuapp.com/delete/proyecto/"+id);
  }

}
