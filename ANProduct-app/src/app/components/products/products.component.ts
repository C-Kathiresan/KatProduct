import { AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ProductModel } from '../../Model/ProductModel';
import { RouterOutlet } from '@angular/router';

 


@Component({
  selector: 'app-products',
  standalone:false,
   templateUrl: './products.component.html',
  styleUrl: './products.component.css'
  
})
export class ProductsComponent implements OnInit {

  products: ProductModel[] = [];
  product: ProductModel = { id: 0, name: '', price: 0 };
  users: any[] = [];
  total = 0;
  page = 1;
  pageSize = 5;
  search = '';
  constructor(private productService: ProductService ){

  }

  ngOnInit() {
    this.load();
    this.loadProducts();
    console.log('ngOnInit: ChildComponent initialized');
  }

  load() {
    
    this.productService.getallproduct().subscribe(data => this.products = data);
  }
  save() {
    if (this.product.id === 0) {
      this.productService.addproduct(this.product).subscribe(() => this.load());
    } else {
      this.productService.Updateproduct(this.product).subscribe(() => this.load());
    }
    this.product = { id: 0, name: '', price: 0 };
  }

  remove(id: number) {alert('hh')
    this.productService.deleteproduct(id).subscribe(() => this.load());
  }

  loadProducts() {
    this.productService.getProducts(this.page, this.pageSize, this.search)
      .subscribe(res => {
        this.products = res.products;
        this.total = res.total;
      });
  }
 
 
  ngAfterViewInit()
  {
    console.log('view changes');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy: ChildComponent destroyed');
  }
  onSearchChange() {
    this.page = 1;
    this.loadProducts();
  }

  nextPage() {
    this.page++;
    this.loadProducts();
  }

  prevPage() {
    if (this.page > 1) this.page--;
    this.loadProducts();
  }
}
