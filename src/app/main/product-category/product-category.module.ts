import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryComponent } from './product-category.component';

const productCategoryRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ProductCategoryComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productCategoryRoutes)
  ],
  declarations: [ProductCategoryComponent]
})
export class ProductCategoryModule { }
