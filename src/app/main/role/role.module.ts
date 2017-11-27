import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';

const roleRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: RoleComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roleRoutes)
  ],
  declarations: [RoleComponent]
})
export class RoleModule { }
