import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { FeedbackComponent } from './feedback.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NotificationService } from '../../core/services/notification.service';
import { DataService } from '../../core/services/data.service';

const feedbackRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: FeedbackComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Daterangepicker,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild(feedbackRoutes)
  ],
  declarations: [FeedbackComponent],
  providers: [DataService, NotificationService]
})
export class FeedbackModule { }
