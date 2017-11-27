import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { Router } from '@angular/router/src/router';

const contactRoutes: Routes = [
  { path: '', redirectTo: 'indext', pathMatch: 'full' },
  { path: 'index', component: ContactComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(contactRoutes)
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
