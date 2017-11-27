import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';

const orderRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: OrderComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes)
  ],
  declarations: [OrderComponent]
})
export class OrderModule { }
