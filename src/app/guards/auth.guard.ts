import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const servicio = inject(LoginService); //inyectamos login service
  const router = inject(Router); //inyectamos el servicio de enrutamiento
  //usamos la funcion que devuelve true o false, esta se basa en el login
  if(servicio.estaAutenticado()){
    return true;  //retornamos true si esta autentificado
  }
  //bloque el acceso a la ruta y nos redirige en este caso a login 
  router.navigate(['']); 
  return false; 
};
