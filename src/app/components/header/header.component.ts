import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { LoginService } from '../../services/login.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-header',
  imports: [MenubarModule, BadgeModule, RippleModule, CommonModule, PanelMenuModule, SidebarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private service: LoginService, private router:Router){}
   items: MenuItem[] = [];
   estalogueado:boolean = false;
   sidebarVisible = false;

  ngOnInit(){
    this.estalogueado = this.service.estaAutenticado();
    if(this.estalogueado){
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/home'
        },
        {
          label: 'registro',
          icon: 'pi pi-user-plus',
          routerLink: '/registro'
        },
      ]
    
    }
  }
  cerrarsesion(){
    this.service.cerrarsesion();
    this.estalogueado = false;
    this.router.navigate(['']);
  }
}  

