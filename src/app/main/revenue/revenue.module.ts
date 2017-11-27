import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RevenueComponent } from './revenue.component';

const revenueRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: RevenueComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(revenueRoutes),
  ],
  declarations: [RevenueComponent]
})
export class RevenueModule { }
