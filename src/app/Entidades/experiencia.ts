export class Experiencia{
    id?:number;
    empresa:string;
    cargo:string;
    fechaInicio:Date;
    fechaFin: Date;
    tareas: string;
    logo: string;
    idPersona:number

    constructor (id:number, empresa:string, cargo:string, fechaInicio:Date,fechaFin:Date,
                 tareas:string, logo:string,idPersona:number )
    {
        this.id=id;
        this.empresa=empresa;
        this.cargo=cargo;
        this.fechaInicio=new Date(fechaInicio);
        this.fechaFin=new Date(fechaFin);
        this.tareas=tareas;
        this.logo=logo;
        this.idPersona=idPersona;
    }

}