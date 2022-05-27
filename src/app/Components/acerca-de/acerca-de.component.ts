import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/Entidades/persona';
import { AuthService } from 'src/app/Service/auth.service';
import { PersonaService } from 'src/app/Service/persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  formAcercaDe: FormGroup;
  info!: Persona;

  constructor(private personaService:PersonaService,private formBuilder:FormBuilder, private authService:AuthService) {
    this.formAcercaDe=this.formBuilder.group({
      acerca_de_mi: ["",Validators.required],
      url_foto:["",Validators.required],
    })

   }

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(info=>{
      this.info=info;
    })
  }
  

  cargarFormulario(){
    this.formAcercaDe.get("id")?.setValue(1)
    this.formAcercaDe.get("acerca_de_mi")?.setValue(this.info.acerca_de_mi)
    this.formAcercaDe.get("url_foto")?.setValue(this.info.url_foto)

  }


  cambiosGuardados(){
    if(this.formAcercaDe.valid){
      alert("Cambios guardados");
      this.info.acerca_de_mi=this.formAcercaDe.value.acerca_de_mi;  
      this.info.url_foto=this.formAcercaDe.value.url_foto;  
      this.personaService.modificarDatosPersonales(this.info).subscribe(info=>{
        console.log(info);
      });
    }
    else{
      alert("Debe completar el campo")
    }
  }

  get logueado(){
    return this.authService.UsuarioAutenticado;
  }

  get acerca_de_mi(){
    return this.formAcercaDe.get('acerca_de_mi');
  }
  get url_foto(){
    return this.formAcercaDe.get('url_foto');
  }

}
