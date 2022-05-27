import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Estudio } from 'src/app/Entidades/estudio';
import { AuthService } from 'src/app/Service/auth.service';
import { EstudioService } from 'src/app/Service/estudio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  formEducacion: FormGroup;
  estudios: Estudio[];
  
  constructor(private estudioService:EstudioService,private formBuilder:FormBuilder, private authService:AuthService) { 
    this.formEducacion=this.formBuilder.group({
      id: [],
      logo: [''],
      titulo: ['',[Validators.required]],
      instituto: ['',[Validators.required]],
      fecha_egreso: ['',[Validators.required]],
    })

    this.estudios=[];
}

  ngOnInit(): void {
    this.estudioService.getListaEstudios().subscribe(data=>{
      this.estudios=data;
    })
  }

  

  cargarFormulario(indice: number){
    this.formEducacion.get("id")?.setValue(indice)
    this.formEducacion.get("logo")?.setValue(this.estudios[indice].logo)
    this.formEducacion.get("titulo")?.setValue(this.estudios[indice].titulo)
    this.formEducacion.get("instituto")?.setValue(this.estudios[indice].instituto)
    this.formEducacion.get("fecha_egreso")?.setValue(formatDate(this.estudios[indice].fecha_egreso,"yyyy-MM-dd","en"))
  }

  cambiosGuardados(){
    if(this.formEducacion.valid){
      alert("Cambios guardados");
      let indice=this.formEducacion.get("id")?.value
      this.estudios[indice].logo=this.formEducacion.value.logo;
      this.estudios[indice].titulo=this.formEducacion.value.titulo; 
      this.estudios[indice].instituto=this.formEducacion.value.instituto;
      this.estudios[indice].fecha_egreso=this.formEducacion.value.fecha_egreso;
      this.estudioService.modificarEstudio(this.estudios[indice]).subscribe(estudio=>{
        console.log(estudio);
      });  
    }
    else{
      alert("Campos invalidos")
    }
  }

  deseaEliminar(id: number){
    this.formEducacion.get("id")?.setValue(id)
  }

  borrarEducacion(){
      this.estudioService.borrarEstudio(this.formEducacion.value.id).subscribe(()=>{
      this.estudios=this.estudios.filter(estudio=>{return this.formEducacion.value.id !==estudio.id});
    }      
    );
  }

  crearEducacion(){ 
    if(this.formEducacion.valid){
      let newEstudio=new Estudio(1,
        this.formEducacion.value.titulo,
        this.formEducacion.value.instituto,
        this.formEducacion.value.fecha_egreso,
        this.formEducacion.value.logo,
        1)
        delete newEstudio.id;
         
      this.estudioService.crearEstudio(newEstudio).subscribe(data=>{
        alert("Estudio guardado");
      this.estudios.push(data);
      });  
    }
    else{
      alert("Campos invalidos")
    }
  }


  get logueado(){
    return this.authService.UsuarioAutenticado;
  }

  get logo(){
    return this.formEducacion.get('logo');
  }
  get titulo(){
    return this.formEducacion.get('titulo');
  }
  get instituto(){
    return this.formEducacion.get('instituto');
  }
  get fecha_egreso(){
    return this.formEducacion.get('fecha_egreso');
  }


}
