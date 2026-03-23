import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class AdminComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'grid', route: '/admin/dashboard' },
    { label: 'Usuarios', icon: 'users', route: '/admin/users' },
    { label: 'Productos', icon: 'package', route: '/admin/products' },
    { label: 'Membresías', icon: 'credit-card', route: '/admin/memberships' },
    { label: 'Eventos', icon: 'calendar', route: '/admin/events' }
  ];
}
