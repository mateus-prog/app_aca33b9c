import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const productsModule = () => import('src/app/products/products.module').then((x) => x.ProductsModule);
const productStockModule = () => import('src/app/product-stock/product-stock.module').then((x) => x.ProductStockModule);

const routes: Routes = [
  { path: 'products', loadChildren: productsModule, },
  { path: '', loadChildren: productsModule, },
  { path: 'product-stock', loadChildren: productStockModule, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
