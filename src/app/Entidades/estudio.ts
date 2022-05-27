export class Estudio{
    id?:number;
    titulo:string;
    instituto:string;
    fecha_egreso:Date;
    logo: string;
    idPersona:number

    constructor (id:number, titulo:string, instituto:string,fecha_egreso:Date,logo:string , idPersona:number )
    {
        this.id=id;
        this.titulo=titulo;
        this.instituto=instituto;
        this.fecha_egreso=new Date(fecha_egreso);
        this.logo=logo;
        this.idPersona=idPersona;
    }

}