import { Injectable } from '@angular/core';
import { Product, ProductResponse } from '../../interface/product';

const API_PRODUCTS_URL = 'https://dummyjson.com/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  async getProducts(): Promise<Product[]> {
    return fetch(`${API_PRODUCTS_URL}?limit=0`)
      .then((response) => response.json())
      .then((response: ProductResponse) => response.products);
  }

  async getProductsDetail(id: number): Promise<Product> {
    return fetch(`${API_PRODUCTS_URL}/${id}`).then((response) =>
      response.json()
    );
  }
}
