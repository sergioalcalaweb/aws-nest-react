import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Product } from '../../interface/product';
import { inject } from '@angular/core';
import { ProductsService } from '../../service/products/products.service';

export const productsResolver: ResolveFn<Product[]> = () => {
  const productsService = inject(ProductsService);
  return productsService.getProducts();
};

export const productDetailResolver: ResolveFn<Product> = (
  route: ActivatedRouteSnapshot
) => {
  const productsService = inject(ProductsService);
  const id = route.params['id'];
  return productsService.getProductsDetail(id);
};
