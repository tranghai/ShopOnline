import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap'
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ProductRouter } from './product.routes';
import { UtilityService } from '../../core/services/utility.service';
import { UploadService } from '../../core/services/upload.service';
import { SimpleTinyComponent } from '../../shared/simple-tiny/simple-tiny.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Daterangepicker,
    ProductRouter,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [ProductComponent, SimpleTinyComponent],
  providers:[DataService, UtilityService, UploadService]
})
export class ProductModule { }
