import { Injectable } from '@angular/core';
import { personas } from '../interfaces/datos';

  @Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private URL: string = 'https://backend-api-rest.onrender.com'


  constructor() { }


  API(datos: any, consulta: string): Promise<any>{
    return fetch(`${this.URL}${consulta}`,{
      method: datos.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then((respuesta: Response)=>{
      if(!respuesta.ok){
        throw new Error('Error al consultar el API');
      }
      return respuesta.json();
    })
    .then(respuesta =>{
      return respuesta.mensaje;
    })
    .catch(error=>{
      console.error('Error al consultar el API');
      return 'Error al consultar el API'
    })
  }
 /*  actualizarDatos(datos: personas ){
    fetch('http://localhost:4000/actualizar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then((respuesta: Response)=>{
      if(!respuesta.ok){
        throw new Error('Error al hacer la consulta');
      }
      return respuesta.json();
      })
    .then(mensaje=>{
      console.log(mensaje);
    })
    .catch(err=>{
      console.log(err);
    })
  }


  enviar(datos: personas): Promise<string>{

    return fetch('http://localhost:4000/ingresar',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(datos)
    })
    .then((respuesta: Response)=>{
      if(!respuesta.ok){
        throw new Error('No se pudo hacer la solicitud')
      }
      return respuesta.json()
    })
    .then((informacion)=>{
      console.log("respuesta",informacion)
      return informacion.mensaje;
    })
    .catch(error =>{
      console.error('algo fallo con la solicitud ',error)
      return 'Error al registrar';
    })
  }


  eliminar(id: any):Promise<string>{
    return fetch('http://localhost:4000/eliminar',{
      method: 'POST',
      headers:{
        'Content-Type': 'appplication/json'
      },
      body: JSON.stringify(id)
    })
    .then((respuesta: Response)=>{
      if(!respuesta.ok){
        throw new Error('Error al hacer la consulta')
      }
      return respuesta.json();
    })
    .then(mensaje=>{
      return 'se ha eliminado el usuario de '
    })
    .catch(err=>{
      console.log(err);
      return 'error'
    })
  } */
}
