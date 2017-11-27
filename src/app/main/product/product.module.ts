import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';

const productRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ProductComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes)
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
