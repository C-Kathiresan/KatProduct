import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './Model/product.model.ts';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  private baseUrl = 'https://localhost:7130/api/Product/';
  
  constructor(private http: HttpClient) { }

  getallproduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'getproducts');
  } 

  addproduct(product: Product) {
    return this.http.post<Product>(this.baseUrl+'addproduct', product);
  }

  Updateproduct(product: Product) {
    return this.http.put(`${this.baseUrl}/Updateproduct/${product.id}`, product);
  }

  deleteproduct(id: number) {
    return this.http.delete(`${this.baseUrl}/deleteproduct/${id}`);
  }
}
