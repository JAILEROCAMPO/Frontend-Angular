import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private socket: WebSocket = new WebSocket('ws://localhost:4000')
  private mensajes: ((data: any )=>void)[] = [];


  async obtenerUsuarios():Promise<any>{
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



  conectar(usuarioId: string): void{
    console.log('ejecutando websocket')
    this.socket.onopen = () =>{
      console.log('Websocket abierto');
      this.enviar({
        tipo: "identificacion",
        usuarioId: usuarioId
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
