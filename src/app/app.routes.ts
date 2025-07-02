import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RegitroUsuarioComponent } from './components/regitro-usuario/regitro-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { SocialComponent } from './components/social/social.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'registro', component: RegistroComponent, canActivate: [authGuard]}, //solo deja ingresar a los usuarios autenticados 
    {path: 'registro-user', component: RegitroUsuarioComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    {path: 'chat', component: SocialComponent, canActivate: [authGuard]},
    { path: '**', redirectTo: '' } //redirije si hay rutas no validas

];