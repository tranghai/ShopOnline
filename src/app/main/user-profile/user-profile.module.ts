import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';

const userProfileRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UserProfileComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userProfileRoutes)
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
