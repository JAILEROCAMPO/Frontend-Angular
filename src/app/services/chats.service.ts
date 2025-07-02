import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private socket: WebSocket = new WebSocket('ws://localhost:4000')
  private mensajes: ((data: any )=>void)[] = [];

  private URL = 'http://localhost:4000';

  obtenerUsuarios():Promise<any>{
    return fetch('http://localhost:4000/usuarios/obtener')
    .then((respuesta: Response)=>{

      if(!respuesta.ok){
        throw new Error('no se pudo hacer la consulta');
      }
      return respuesta.json();
    })
    .then(informacion=>{
      return informacion;
    })
    .catch(err=>{
      console.error(err);
      return 'error al procesar la respuesta';
    })
  }
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
      return respuesta;
    })
    .catch(error=>{
      console.error('Error al consultar el API');
      return 'Error al consultar el API'
    })
  }



  conectar(usuarioId: string): void{
    console.log('ejecutando websocket')
    this.socket.onopen = () =>{
      console.log('Websocket abierto');
      this.enviar({
        tipo: "identificacion",
        usuarioId: Number(usuarioId)
      });
    };

    this.socket.onmessage = (event)=>{
      const data = JSON.parse(event.data);
      this.mensajes.forEach(cb => cb(data));
    };

    this.socket.onclose= () =>{
      console.log('WebSocket desconetado');
    };

    this.socket.onerror = (err) =>{
      console.error(err);
    };

  }

  enviar(data: any):void{
    if(this.socket?.readyState === WebSocket.OPEN){
      this.socket.send(JSON.stringify(data));
    }else{
      console.log('websocket no esta listo para enviar')
    }
  }

  recibir(mensaje: (data: any)=> void): void{
    this.mensajes.push(mensaje);
  }

  close():void{
    this.socket?.close();
  }
  
  
}
