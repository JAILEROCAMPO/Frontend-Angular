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
  mensajesAnteriores: any[] = [];
  nombrechat = localStorage.getItem('usuario');
  idchat: any = '';

  ngOnInit(): void {
    if(this.usuarioId){
      this.servicio.conectar(this.usuarioId);
      console.log('comprobar id', this.usuarioId)
      this.servicio.recibir((data) => {
      if(data.tipo === 'mensaje') {
          this.mensajesAnteriores.push(data);
          this.mensajesAnteriores = [...this.mensajesAnteriores];
        }
      });
    }else{
      console.log('No hay usuario id en localStorage');
    }
    
    this.servicio.obtenerUsuarios()
      .then((respuesta)=>{
        this.usuarios = respuesta.usuarios;
        this.cargando = false;
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
    this.nombrechat += event.value.nombre;
    const contenido = {
        nombreChat: this.nombrechat, 
        esGrupal: false,
        creadoPor: Number(this.usuarioId), 
        usuarioid1: Number(this.usuarioId),
        usuarioid2: event.value.id
      }
    
    this.servicio.API({...contenido, method: 'POST'}, '/chat/iniciarChat')
      .then((respuesta)=>{
        this.mensajesAnteriores = respuesta.mensajes;
        this.idchat = respuesta.idchat;
        console.log(respuesta);
      })
  }
  enviarMensaje(){
    if(this.mensaje.trim() === '') return;

    const nuevoMensaje = {
      tipo: "mensaje",
      chatId: this.idchat,
      remitenteid: Number(this.usuarioId),
      contenido: this.mensaje,
      formato: "texto"
    };
    this.servicio.enviar(nuevoMensaje);

    // Actualizar localmente para ver mensaje al instante
    this.mensajesAnteriores.push(nuevoMensaje);
    this.mensajesAnteriores = [...this.mensajesAnteriores]; // fuerza detección cambio
    this.mensaje = '';
  }
}


