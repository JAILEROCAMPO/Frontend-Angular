import { Injectable } from '@angular/core';
import { error } from 'console';
import { login, personas, usuario } from '../interfaces/datos';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  
  registrar(datos: usuario): Promise<string>{
    return fetch('https://backend-api-rest.onrender.com/auth/Registro',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    })
    .then((respuesta: Response)=>{
      if(!respuesta.ok){
        throw new Error('Error al hacer la consulta'); 
      }
      return respuesta.json();
    })
    .then(mensaje=>{
      console.log('Respuesta', mensaje);
      return mensaje.mensaje;
    })
    .catch(err=>{
      console.error('Error al procesar la respuesta', err)
      return 'Error al procesar la respuesta';
    })
  }
  

  iniciar(datos: login): Promise<any>{
    return fetch('https://backend-api-rest.onrender.com/auth/Login',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    })
    .then((respuesta: Response)=>{
      if(!respuesta.ok){
        throw new Error('error al hacer la consulta');
      }
      return respuesta.json();
    })
    .then(mensaje =>{
      console.log('respuesta',mensaje);
      if(mensaje.token){
        console.log('si entra');
        localStorage.setItem('token', mensaje.token);
      }
      return mensaje;
    })
    .catch(err =>{
      console.log(err);
      return 'Error al procesar la respuesta';
    })
  }


  estaAutenticado(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const token = !!localStorage.getItem('token');
      console.log('funciona o no', token);
      return token;
    }
    console.log('No hay acceso a localStorage');
    return false;
  }


  cerrarsesion(){
    localStorage.removeItem('token')
  }
}
