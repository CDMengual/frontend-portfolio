export class Habilidad{
    id?:number;
    skill:string;
    puntuacion:number;
    logo:string;
    idPersona:number

    constructor (id:number, skill:string,puntuacion:number, logo:string, idPersona:number )
    {
        this.id=id;
        this.skill=skill;
        this.puntuacion=puntuacion;
        this.logo=logo;
        this.idPersona=idPersona;
    }

}