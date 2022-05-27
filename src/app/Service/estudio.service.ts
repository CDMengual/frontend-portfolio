import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudio } from '../Entidades/estudio';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  constructor(private http:HttpClient) {}

  getListaEstudios(): Observable<Estudio[]>{
    return this.http.get<Estudio[]>("https://portfolio-backend-srpingboot.herokuapp.com/ver/estudios");
  }

  getEstudio(id:String): Observable<any>{
    return this.http.get("https://portfolio-backend-srpingboot.herokuapp.com/ver/estudio/"+id);
  }

  crearEstudio(estudio:Estudio): Observable<any>{
    return this.http.post("https://portfolio-backend-srpingboot.herokuapp.com/new/estudio",estudio);
  }

  modificarEstudio(estudio:Estudio): Observable<any>{
    console.log(estudio);
    return this.http.put("https://portfolio-backend-srpingboot.herokuapp.com/modificar/estudio",estudio);
  }

  borrarEstudio(id:number): Observable<any>{
    return this.http.delete("https://portfolio-backend-srpingboot.herokuapp.com/delete/estudio/"+id);
  }

}


