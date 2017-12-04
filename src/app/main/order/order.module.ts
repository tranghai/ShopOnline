import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { UploadService } from './../../core/services/upload.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { OrderRoute } from './order-routes';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderAddComponent } from './order-add/order-add.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoute,
    FormsModule,
    PaginationModule,
    Daterangepicker,
    ModalModule
  ],
  declarations: [OrderComponent, OrderAddComponent, OrderDetailComponent],
  providers: [DataService, UtilityService, UploadService]
})
export class OrderModule { }
