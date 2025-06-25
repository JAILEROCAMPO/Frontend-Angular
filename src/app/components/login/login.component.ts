import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [InputTextModule,
  FloatLabelModule, 
  FormsModule, 
  RouterLink
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private service: LoginService, private router: Router){}
  correo: string = '';
  contrasena: string = '';
  respuesta: string = '';

  enviardatos(){
    this.service.iniciar({
      correo: this.correo,
      contrasena: this.contrasena
    })
    .then(mensaje=>{
      if(mensaje.token){
        this.router.navigate(['home']);
      }
      console.log(mensaje);
      console.log(mensaje.exito);
      this.respuesta = mensaje.mensaje
    })
  }
}
