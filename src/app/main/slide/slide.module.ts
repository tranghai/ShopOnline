import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap'
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../core/services/upload.service';

const slideRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: SlideComponent }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(slideRoutes),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [SlideComponent],
  providers: [DataService, NotificationService, UploadService]
})
export class SlideModule { }
