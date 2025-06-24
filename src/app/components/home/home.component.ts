import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { OperacionesService } from '../../services/operaciones.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { personas, usuario } from '../../interfaces/datos';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from "../header/header.component";
import { ChangeDetectorRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { RegistroService } from '../../services/registro.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    CommonModule,
    SelectModule,
    TableModule,
    HeaderComponent,
    DialogModule,
    ButtonModule,
    Dialog,
    ConfirmDialogModule,
    ToastModule
],
providers: [
  MessageService,
  ConfirmationService
],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss' 
})
export class HomeComponent implements OnInit{

  constructor(
    private carga:ChangeDetectorRef,
    private service: OperacionesService,
    private actua: RegistroService,
    private mensajeservice: MessageService
  ){} 

  mostarmensaje(tipo: string, descripcion: string, titulo: string){
    this.mensajeservice.add({
      severity: tipo,
      detail: descripcion,
      summary: titulo
    })
  }
 
  ngOnInit():void{
    this.service.consulta()
      .then((promesa)=>{
        this.respuesta = {resultado: promesa, mensaje: 'Tabla de usuarios'};
      })
  }
 

  respuesta:any;
  opciones: string[] = ['contar', 'agregar', 'filtrar', 'eliminar'];


  opcioncambiada(){
    this.carga.detectChanges()
  }


  visible: boolean = false;
  visible2: boolean = false;
  nombre: string = '';
  edad: number = 0;
  sexo: string = '';
  altura: number = 0;
  id: number = 0;
  mensaje: string = '';


  usuario(user: any){
    const {nombre, edad, sexo, altura, id} = user;
    this.nombre = nombre;
    this.edad = edad;
    this.sexo = sexo;
    this.altura = altura;
    this.id = id;
    console.log('click en ', user);
  }


  actualizar(){
    this.mostarmensaje('success',`El usuario de ${this.nombre} ha sido actualizado` ,'Actualizado' );
    this.actua.API({
      nombre: this.nombre,
      edad: this.edad,
      sexo: this.sexo,
      altura: this.altura,
      id: this.id,
      method: 'PUT'
    },'/usuarios/actualizarUsuario');

    this.recargartabla();
   /*  this.actua.actualizarDatos({
      nombre: this.nombre,
      edad: this.edad,
      sexo: this.sexo,
      altura: this.altura,
      id: this.id
    }) */
  }


  recargartabla(){
    this.respuesta = '';
    setTimeout(()=>{
      this.service.consulta()
        .then((promesa)=>{
          this.respuesta = {resultado: promesa, mensaje: 'Tabla usuarios'}
        })
    }, 500);
  }
  

  eliminar(){
    this.mostarmensaje('warn',`El usuario ${this.nombre} ha sido eliminado` ,'Eliminado' );
    this.recargartabla();
    this.actua.API({
      id: this.id,
      method: 'DELETE'
    }, '/usuarios/borrarUsuario')
    /* this.actua.eliminar({
      id: this.id
    }); */
  }
 

  clave: keyof personas = 'nombre';
  valor: any = '';
  filtro: string = '';
  opcion: string = '';
  convertirValor(valor: string): string | number | Date {
    const numero = Number(valor);
    const fecha = new Date(valor);
    
    return !isNaN(numero) && valor !== '' ? numero : !isNaN(fecha.getTime()) ? fecha : valor;
  }
  

  get columnas(){
    const columnas = new Set<string>();
    this.respuesta?.resultado?.forEach((obj: any) =>
      Object.keys(obj).forEach((k) => columnas.add(k))
    );
    return Array.from(columnas);
  }
  
  ejecutarAccion() {
    const valorConvertido = this.convertirValor(this.valor); 
    this.respuesta = this.service.acceso({
      opcion: this.opcion,
      clave: this.clave,
      valor: valorConvertido,
      filtro: this.filtro
    });
    console.log(this.respuesta);
  }
}
