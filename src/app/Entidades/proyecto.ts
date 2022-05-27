export class Proyecto{
    id?:number;
    nombreProyecto:string;
    info:string;
    imagen:string;
    idPersona:number

    constructor (id:number, nombreProyecto:string,info:string, imagen:string, idPersona:number )
    {
        this.id=id;
        this.nombreProyecto=nombreProyecto;
        this.info=info;
        this.imagen=imagen;
        this.idPersona=idPersona;
    }

}