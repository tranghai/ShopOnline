import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { FeedbackComponent } from './feedback.component';
const feedbackRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: FeedbackComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(feedbackRoutes)
  ],
  declarations: [FeedbackComponent]
})
export class FeedbackModule { }
