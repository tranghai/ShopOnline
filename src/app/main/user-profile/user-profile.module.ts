import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { AuthenService } from '../../core/services/authen.service'; 
import { UploadService  } from '../../core/services/upload.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Daterangepicker } from 'ng2-daterangepicker';

const userProfileRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserProfileComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Daterangepicker,
    ModalModule.forRoot(),
    RouterModule.forChild(userProfileRoutes)
  ],
  declarations: [UserProfileComponent],
  providers: [AuthenService, NotificationService, UploadService]
})
export class UserProfileModule { }
