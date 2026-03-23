import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule], // Added CommonModule for *ngIf
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  isScrolled = false;
  isMobileMenuOpen = false;
  isServicesExpanded = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isServicesExpanded = false; // Reset accordion state when closing menu
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isServicesExpanded = false;
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    const roles = this.authService.getUserRoles();
    return roles.includes('ADMIN');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleServices(event: Event) {
    // Only applies logical toggling if in mobile view (where standard hover is unsupported or tricky)
    if (window.innerWidth <= 768) {
      event.preventDefault();
      this.isServicesExpanded = !this.isServicesExpanded;
    }
  }
}
