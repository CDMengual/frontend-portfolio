import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/Entidades/persona';
import { AuthService } from 'src/app/Service/auth.service';
import { PersonaService } from 'src/app/Service/persona.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formHeader: FormGroup;
  imagen: string;
  info!: Persona;

  constructor(private personaService:PersonaService,private formBuilder:FormBuilder, private authService:AuthService) {
    this.formHeader=this.formBuilder.group({
      id: [],
      nombre: ["",[Validators.required]],
      apellido: ["",[Validators.required]],
      posicion: ["",[Validators.required]],
      ciudadDeResidencia: ["", [Validators.required]],

    })
  
    this.imagen= "../../../assets/imagenes/Bannercielo.png"
   }

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(info=>{
      this.info=info;
    })
  }

  cargarFormulario(){
    this.formHeader.get("id")?.setValue(1)
    this.formHeader.get("nombre")?.setValue(this.info.nombre)
    this.formHeader.get("apellido")?.setValue(this.info.apellido)
    this.formHeader.get("posicion")?.setValue(this.info.puesto)
    this.formHeader.get("ciudadDeResidencia")?.setValue(this.info.ciudad)
   
  }

  cambiosGuardados(){
    if(this.formHeader.valid){
      alert("Cambios guardados");
      this.info.nombre=this.formHeader.value.nombre;
      this.info.apellido=this.formHeader.value.apellido;
      this.info.puesto=this.formHeader.value.posicion; 
      this.info.ciudad=this.formHeader.value.ciudadDeResidencia;  
      this.personaService.modificarDatosPersonales(this.info).subscribe(info=>{
        console.log(info);
      });  
    }
    else{
      alert("Campos invalidos")
    }
  }

  get logueado(){
    return this.authService.UsuarioAutenticado;
  }
  cerrarSesion(){
    this.authService.cerrarSesion();
  }


  
  get nombre(){
    return this.formHeader.get('nombre');
  }
  get apellido(){
    return this.formHeader.get('apellido');
  }
  get posicion(){
    return this.formHeader.get('posicion');
  }
  get ciudadDeResidencia(){
    return this.formHeader.get('ciudadDeResidencia')
  }

}
