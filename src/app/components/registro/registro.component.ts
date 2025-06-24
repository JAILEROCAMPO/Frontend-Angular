import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'app-registro',
  imports: [InputTextModule, FloatLabelModule, FormsModule, HeaderComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  constructor(private registro: RegistroService){ }
  mensaje: string = '';
  nombre: string = '';
  edad:number = 0;
  sexo:string = '';
  altura: number = 0;
  

  enviardatos(){
    this.registro.API({
      nombre: this.nombre,
      edad: this.edad,
      sexo: this.sexo,
      altura: this.altura,
      method: 'POST'
    },'/usuarios/registrarUsuario')
    .then((mensaje)=>{
      this.mensaje = mensaje;
    })

    /* this.registro.enviar({
      nombre: this.nombre,
      edad: this.edad,
      sexo: this.sexo,
      altura: this.altura
    })
    .then((mensaje)=>{
      this.mensaje = mensaje;
    }) */

  }

  
  
}
