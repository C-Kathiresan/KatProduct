import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductModel } from './Model/ProductModel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-app';
 
  products: ProductModel[] = [];
  product: ProductModel = { id: 0, name: '', price: 0 };

  constructor(private http: HttpClient){

  }
   
}
