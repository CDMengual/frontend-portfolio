import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  error:boolean;

 
  constructor(private formBuilder:FormBuilder, private authService:AuthService) {
    this.formLogin=this.formBuilder.group({
      email:["",[Validators.required]],
      password:["",[Validators.required]],
    })
    this.error=false;

   }

  ngOnInit(): void {
  }

  onEnviar(event:Event){
    event.preventDefault;
    this.error=false;
    this.authService.IniciarSesion(this.formLogin.value).subscribe(data=>{
      if(!data){
        this.error=true;
      }
      else{
        this.closeModal.nativeElement.click();    
      }
    })
  }
  @ViewChild('closeModal', { static: false })
  closeModal!: ElementRef;


  


  get logueado(){
    return this.authService.UsuarioAutenticado;
  }

  get email(){
    return this.formLogin.get('email');
  }
  get password(){
   return this.formLogin.get('password');
}


}
