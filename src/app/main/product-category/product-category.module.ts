import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap'
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';

const productCategoryRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ProductCategoryComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Daterangepicker,
    RouterModule.forChild(productCategoryRoutes),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [ProductCategoryComponent],
  providers: [DataService, NotificationService]
})
export class ProductCategoryModule { }
