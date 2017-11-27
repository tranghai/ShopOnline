import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SlideComponent } from './slide.component';

const slideRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: SlideComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(slideRoutes)
  ],
  declarations: [SlideComponent]
})
export class SlideModule { }
