import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  getImageUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${environment.apiUrl}${url}`;
  }
  
  productos: any[] = [];
  loading = true;
  errorMessage = '';

  categories = ['Todos', 'Suplementos', 'Rendimiento', 'Recuperación', 'Ropa', 'Accesorios', 'Energía'];
  selectedCategory = 'Todos';

  get filteredProductos() {
    if (this.selectedCategory === 'Todos') {
      return this.productos;
    }
    return this.productos.filter(p => p.category === this.selectedCategory || p.cat === this.selectedCategory);
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
  }

  addToCart(producto: any) {
    this.cartService.addToCart(producto);
    producto.added = true;
    setTimeout(() => producto.added = false, 800);
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.errorMessage = 'No se pudieron cargar los productos.';
        this.loading = false;
      }
    });
  }
}
