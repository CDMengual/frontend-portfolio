import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/Entidades/proyecto';
import { AuthService } from 'src/app/Service/auth.service';
import { ProyectoService } from 'src/app/Service/proyecto.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  formProyecto: FormGroup;
  proyectos: Proyecto[];

  constructor(private proyectoService:ProyectoService,private formBuilder:FormBuilder, private authService:AuthService) {
    this.formProyecto=this.formBuilder.group({
      id: [],
      nombreProyecto: ["",[Validators.required]],
      info: ["",[Validators.required]],
      imagen: ["", [Validators.required]],
    })

    this.proyectos=[];
   }

  ngOnInit(): void {
    this.proyectoService.getListaProyectos().subscribe(data=>{
      this.proyectos=data;})
  }

  cargarFormulario(indice: number){
    this.formProyecto.get("id")?.setValue(indice)
    this.formProyecto.get("nombreProyecto")?.setValue(this.proyectos[indice].nombreProyecto)
    this.formProyecto.get("info")?.setValue(this.proyectos[indice].info)
    this.formProyecto.get("imagen")?.setValue(this.proyectos[indice].imagen)
  }

  cambiosGuardados(){
    if(this.formProyecto.valid){
      alert("Cambios guardados");
      let indice=this.formProyecto.get("id")?.value
      this.proyectos[indice].nombreProyecto=this.formProyecto.value.nombreProyecto;  
      this.proyectos[indice].info=this.formProyecto.value.info;
      this.proyectos[indice].imagen=this.formProyecto.value.imagen;
      this.proyectoService.modificarProyecto  (this.proyectos[indice]).subscribe(proyecto=>{
        console.log(proyecto);
      });  
    }
    else{
      alert("Campos invalidos")
    }
  }        

  deseaEliminar(id: number){
    this.formProyecto.get("id")?.setValue(id)
  }

  borrarProyecto(){
    this.proyectoService.borrarProyecto(this.formProyecto.value.id).subscribe(()=>{
      this.proyectos=this.proyectos.filter(proyecto=>{return this.formProyecto.value.id !==proyecto.id});
    }      
    );
  }
  crearProyecto(){ 
    if(this.formProyecto.valid){
      let newProyecto=new Proyecto(1,
        this.formProyecto.value.nombreProyecto,
        this.formProyecto.value.info,
        this.formProyecto.value.imagen,
        1)
        delete newProyecto.id;
         
      this.proyectoService.crearProyecto(newProyecto).subscribe(data=>{
        alert("Proyecto guardado");
      this.proyectos.push(data);
      });  
    }
    else{
      alert("Campos invalidos")
    }
  }

  get logueado(){
    return this.authService.UsuarioAutenticado;
  }

  get nombreProyecto(){
    return this.formProyecto.get('proyecto');
  }
  get info(){
    return this.formProyecto.get('info');
  }
  get imagen(){
    return this.formProyecto.get('imagen');
  }

}
