import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  categories = ['Todos', 'Suplementos', 'Rendimiento', 'Recuperación', 'Ropa', 'Accesorios', 'Energía'];
  selectedCategory = 'Todos';

  productos: any[] = [
    { name: '100% Whey Protein', cat: 'Suplementos', price: 59.99, tag: 'Más Vendido' },
    { name: 'Creatina Monohidratada', cat: 'Rendimiento', price: 24.99, tag: '' },
    { name: 'BCAAs Energy', cat: 'Recuperación', price: 34.50, tag: '' },
    { name: 'Camiseta RealMyFit', cat: 'Ropa', price: 19.99, tag: 'Nuevo' },
    { name: 'Shaker Pro', cat: 'Accesorios', price: 9.99, tag: '' },
    { name: 'Pre-Workout Explosive', cat: 'Energía', price: 39.90, tag: 'Agotado' }
  ];

  constructor(private cartService: CartService) { }

  get filteredProductos() {
    if (this.selectedCategory === 'Todos') {
      return this.productos;
    }
    return this.productos.filter(p => p.cat === this.selectedCategory);
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
  }

  addToCart(producto: any) {
    this.cartService.addToCart(producto);
    producto.added = true;
    setTimeout(() => producto.added = false, 800);
  }
}
