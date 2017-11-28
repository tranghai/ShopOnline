import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule, ModalModule } from 'ngx-bootstrap'
import { FormsModule } from '@angular/forms';

const contactRoutes: Routes = [
  { path: '', redirectTo: 'indext', pathMatch: 'full' },
  { path: 'index', component: ContactComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(contactRoutes),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [ContactComponent],
  providers: [DataService, NotificationService]
})
export class ContactModule { }
