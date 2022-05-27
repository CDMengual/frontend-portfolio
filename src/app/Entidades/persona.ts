export class Persona{
    id:  number;
    nombre:     string;
    apellido:   string;
    puesto:     string;
    ciudad:     string;
    acerca_de_mi: string;
    url_foto: string;

   constructor( id:number, nombre:string,  apellido:string, puesto:string, ciudad:string, acerca_de_mi:string, url_foto:string)
   {
       this.id=id;
       this.nombre=nombre;
       this.apellido=apellido;
       this.puesto=puesto;
       this.ciudad=ciudad;
       this.acerca_de_mi=acerca_de_mi;
       this.url_foto=url_foto;
   }

}