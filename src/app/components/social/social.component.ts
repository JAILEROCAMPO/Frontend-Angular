import { Component, OnInit } from '@angular/core';
import { ChatsService } from '../../services/chats.service';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { usuario } from '../../interfaces/datos';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-social',
  imports: [ListboxModule, 
    PanelModule, InputTextModule, 
    FormsModule, HeaderComponent, 
    ProgressSpinnerModule, 
    CommonModule,
    ScrollPanelModule
  ],
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss'
})
export class SocialComponent implements OnInit {

  constructor(private servicio: ChatsService){}


  usuarioId = localStorage.getItem('usuarioid');
  usuarios:usuario[] = [];
  cargando: boolean = true;
  chat: boolean = false;
  mensaje: string = '';

  ngOnInit(): void {
    if(this.usuarioId){
      this.servicio.conectar(this.usuarioId);
      console.log('comprobar id', this.usuarioId)
    }else{
      console.log('No hay usuario id en localStorage');
    }
    
    this.servicio.obtenerUsuarios()
      .then((respuesta)=>{
        this.usuarios = respuesta.usuarios;
        this.cargando = false;
        console.log(this.usuarios);
      })
    
  }
  
  


  usuarioSeleccionado: any = null;

  seleccionarUsuario(event: any) {
    console.log('Usuario seleccionado:', event.value);
    if(this.chat){
      this.chat = false;
      console.log('cambio de chat');
    }
    this.chat = true;
  }
  enviarMensaje(){
    this.servicio.enviar({
      "tipo": "mensaje",
      "chatId": 1,
      "remitenteId": this.usuarioId,
      "contenido": this.mensaje,
      "formato": "texto"
    });
    console.log(this.mensaje);
    this.mensaje = '';
  }
}


