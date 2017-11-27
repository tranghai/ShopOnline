import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VisitorComponent } from './visitor.component';

const visitorRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: VisitorComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(visitorRoutes),
  ],
  declarations: [VisitorComponent]
})
export class VisitorModule { }
