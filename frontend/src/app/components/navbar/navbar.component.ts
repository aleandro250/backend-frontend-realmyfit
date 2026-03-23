import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive], // Standalone needs Router link imports for template usage
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  isServicesExpanded = false;
  totalItems = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.totalItems = items.reduce((acc, item) => acc + item.qty, 0);
    });
  }

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

  toggleServices(event: Event) {
    // Only applies logical toggling if in mobile view (where standard hover is unsupported or tricky)
    if (window.innerWidth <= 768) {
      event.preventDefault();
      this.isServicesExpanded = !this.isServicesExpanded;
    }
  }
}
