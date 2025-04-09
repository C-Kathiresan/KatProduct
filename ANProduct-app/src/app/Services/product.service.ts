import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../Model/ProductModel';


@Injectable({
  providedIn: 'any'
})
export class ProductService {

  private baseUrl = 'https://localhost:7130/api/Product/';
  
  constructor(private http: HttpClient) { }

  getallproduct():Observable<ProductModel[]>{
    var tt =this.http.get(this.baseUrl+'getproducts');
    return this.http.get<ProductModel[]>(this.baseUrl+'getproducts');
  } 

  addproduct(product: ProductModel) {
    return this.http.post<ProductModel>(this.baseUrl+'addproduct', product);
  }

  Updateproduct(product: ProductModel) {
    return this.http.put(`${this.baseUrl}/Updateproduct/${product.id}`, product);
  }

  deleteproduct(id: number) {
    return this.http.delete(`${this.baseUrl}/deleteproduct/${id}`);
  }
  getProducts(page = 1, pageSize = 2, search = '') {
    return this.http.get<any>(`${this.baseUrl+'getallpro'}?page=${page}&pageSize=${pageSize}&search=${search}`);
  }
}
