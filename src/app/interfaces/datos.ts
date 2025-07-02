export interface opcionesInterface{
    opcion: string,
    clave: keyof personas,
    valor: any,
    filtro: string,
    objeto?: any
};
export interface personas {
  nombre: string,
  edad: number,
  sexo: string,
  altura: string | number,
  id? : number
};
export interface Respuesta {
  mensaje: string;
  resultado?: personas[] | number | string;
};
export interface Respuesta {
  mensaje: string;
  resultado?: string | number | personas[];
}
export interface usuario{
  id?: number
  correo: string,
  contrasena: string,
  nombre: string,
  documento: number
}
export interface login{
  correo: string,
  contrasena: string
}
