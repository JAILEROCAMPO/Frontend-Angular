import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-regitro-usuario',
  imports: [InputTextModule, FloatLabelModule, FormsModule, ButtonModule, HeaderComponent, RouterLink],
  templateUrl: './regitro-usuario.component.html',
  styleUrl: './regitro-usuario.component.scss'
})
export class RegitroUsuarioComponent {
  constructor(private service:LoginService){}
  correo: string = '';
  contrasena: string = '';
  nombre: string = '';
  documento: number = 0;
  respuesta: string = '';
  

  enviardatos(){
    this.service.registrar({
      correo: this.correo,
      contrasena: this.contrasena,
      nombre: this.nombre,
      documento: this.documento
    })
    .then(mensaje =>{
      this.respuesta = mensaje;
      console.log(mensaje)
    })
  }
}
