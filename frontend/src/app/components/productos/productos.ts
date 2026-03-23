import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  private productsService = inject(ProductsService);
  
  productos: any[] = [];
  loading = true;
  errorMessage = '';

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
