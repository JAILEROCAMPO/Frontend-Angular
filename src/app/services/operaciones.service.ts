import { Injectable } from '@angular/core';
import { personas, opcionesInterface, Respuesta } from '../interfaces/datos';
@Injectable({
  providedIn: 'root'
})
export class OperacionesService {
  
  constructor() { }


  contarf(lista: personas[], parametro1: keyof personas, parametro2: any):[personas[], string | number] {
    const filtro = this.filtrarf(lista, parametro1, parametro2);
    let contar = filtro.length;
    const mensaje = contar > 0 ? contar : 'No hay coincidencias';
    return  [filtro, mensaje]
  };


  agregarf(lista: personas[], clave: keyof personas | string, valor: any, filtro?: string): (personas & { [key: string]: any })[] {
    //estabamos comparando p.nombre con filtro vacio y se agregaba a los campos vacios, se le agrego una condicion adiccional
    const existe = lista.some(p => p.nombre === filtro && filtro !== '');
    const resultado = lista.map(p => {
      return existe ? (p.nombre === filtro ? { ...p, [clave]: valor } : p) : { ...p, [clave]: valor };
    });
    return resultado;
  };


  filtrarf(lista: personas[], clave: keyof personas, valor: any): personas[] {
    const valor2 = typeof valor === 'string' ? valor.toLowerCase() : valor;
    return lista.filter(p => String(p[clave]).toLowerCase() === valor2);
  }


  eliminarf(lista: personas[], nombre: string): personas[] {
    const indice = lista.findIndex(p => p.nombre === nombre);
    if(indice !== -1){
      lista.splice(indice, 1);
    }else{
      alert('No hay registros con la coincidencia buscada');
    }
    return lista;
  };


  private respuestaAPI: personas[] = [];


  consulta():Promise<string>{
    return fetch('https://backend-api-rest.onrender.com/usuarios/')
    .then((respuesta: Response)=>{
      if(!respuesta.ok){
        throw new Error('No se pudo hacer la solicitud');
      }
      console.log(respuesta);
      return respuesta.json();
    })
    .then(informacion =>{
      console.log(informacion);
      this.respuestaAPI = informacion;
      return informacion;
    })
    .catch(error =>{
      console.error("Error al consultar el API", error);
      return 'Error al consultar el API';
    })
  }
  
  
  acceso(opciones: opcionesInterface):Respuesta{
    if (opciones.opcion === "contar") {
      let [lista, mensaje] = this.contarf(this.respuestaAPI, opciones.clave, opciones.valor);
      return{
        mensaje: `hay ${mensaje} con clave valor = ${opciones.clave} : ${opciones.valor} `,
        resultado: lista
      };
    } else if (opciones.opcion === "agregar") {
      let agregar = this.agregarf(this.respuestaAPI, opciones.clave, opciones.valor, opciones?.filtro);
      let todos = opciones.filtro ? `Se agrego solo a ${opciones.filtro}` : "Se agrego a Todos los objetos";
      return{
        mensaje: `Los valores: clave = ${opciones.clave}, valor = ${opciones.valor}, ${todos}`,
        resultado: agregar
      };
    }else if (opciones.opcion === "filtrar") {
      let filtrado = this.filtrarf(this.respuestaAPI, opciones.clave, opciones.valor);
      return{
        mensaje: `Se filtro los objetos con ${opciones.clave} : ${opciones.valor}`, 
        resultado: filtrado
      };

    } else if (opciones.opcion === "eliminar") {
      let eliminado = this.eliminarf(this.respuestaAPI, opciones.valor);
      return{
        mensaje: `Se ha eliminado el Objeto de ${opciones.valor}`, 
        resultado: eliminado
    };
    } else {
      return{
        mensaje: "Por favor ingresa una opcion valida"
      };
    }
  }
}
