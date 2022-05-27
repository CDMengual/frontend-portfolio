import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Habilidad } from 'src/app/Entidades/habilidad';
import { AuthService } from 'src/app/Service/auth.service';
import { HabilidadService } from 'src/app/Service/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  formHabilidad: FormGroup;
  habilidades: Habilidad[];

  constructor(private habilidadService:HabilidadService,private formBuilder:FormBuilder, private authService:AuthService) {
    this.formHabilidad=this.formBuilder.group({
      id: [],
      skill: ["",[Validators.required]],
      puntuacion:["",[Validators.required],],
      logo:[""],
    })

    this.habilidades=[];
  } 

  ngOnInit(): void {
    this.habilidadService.getListaHabilidades().subscribe(data=>{
      this.habilidades=data;})
  }

 
    cargarFormulario(indice: number){
    this.formHabilidad.get("id")?.setValue(indice)
    this.formHabilidad.get("skill")?.setValue(this.habilidades[indice].skill)
    this.formHabilidad.get("puntuacion")?.setValue(this.habilidades[indice].puntuacion)
    this.formHabilidad.get("logo")?.setValue(this.habilidades[indice].logo)
  }

  cambiosGuardados(){
    if(this.formHabilidad.valid){
      alert("Cambios guardados");
      let indice=this.formHabilidad.get("id")?.value
      this.habilidades[indice].skill=this.formHabilidad.value.skill;
      this.habilidades[indice].puntuacion=this.formHabilidad.value.puntuacion; 
      this.habilidades[indice].logo=this.formHabilidad.value.logo;  
      this.habilidadService.modificarHabilidad(this.habilidades[indice]).subscribe(habilidad=>{
        console.log(habilidad);
      });  
    }
    else{
      alert("Campos invalidos")
    }
  }


  deseaEliminar(id: number){
    this.formHabilidad.get("id")?.setValue(id)
  }

  borrarHabilidad(){
    this.habilidadService.borrarHabilidad(this.formHabilidad.value.id).subscribe(()=>{
      this.habilidades=this.habilidades.filter(habilidad=>{return this.formHabilidad.value.id !==habilidad.id});
    }      
    );
  }

  crearHabilidad(){ 
    if(this.formHabilidad.valid){
      let newHabilidad=new Habilidad(1,
        this.formHabilidad.value.skill,
        this.formHabilidad.value.puntuacion,
        this.formHabilidad.value.logo,
        1)
        delete newHabilidad.id;
         
      this.habilidadService.crearHabilidad(newHabilidad).subscribe(data=>{
        alert("Habilidad guardada");
      this.habilidades.push(data);
      console.log(data);
      });  
    }
    else{
      alert("Campos invalidos")
    }
  }


  get logueado(){
    return this.authService.UsuarioAutenticado;
  }

  get skill(){
    return this.formHabilidad.get('skill');
  }
  get puntuacion(){
    return this.formHabilidad.get('puntuacion');
  }
  get logo(){
    return this.formHabilidad.get('logo');
  }

}
