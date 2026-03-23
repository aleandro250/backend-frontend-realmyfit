import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login.component'; 
import { ProductosComponent } from './components/productos/productos';
import { EntrenadoresComponent } from './components/entrenadores/entrenadores';
import { MaquinasComponent } from './components/maquinas/maquinas';
import { MembresiasComponent } from './components/membresias/membresias';
import { CartComponent } from './components/cart/cart';
import { EventosComponent } from './components/eventos/eventos';
import { AdminDashboardComponent } from './components/admin/dashboard';
import { AdminComponent } from './components/admin/admin';

import { AdminUsersComponent } from './components/admin/users';
import { AdminProductsComponent } from './components/admin/products';

import { AdminPlaceholderComponent } from './components/admin/placeholder';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'entrenadores', component: EntrenadoresComponent },
  { path: 'maquinas', component: MaquinasComponent },
  { path: 'membresias', component: MembresiasComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'cart', component: CartComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'memberships', component: AdminPlaceholderComponent },
      { path: 'events', component: AdminPlaceholderComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
