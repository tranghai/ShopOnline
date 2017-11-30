import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap'
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';

const productRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ProductComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Daterangepicker,
    RouterModule.forChild(productRoutes),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [ProductComponent]
})
export class ProductModule { }
