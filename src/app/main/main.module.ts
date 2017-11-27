import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { SlideComponent } from './slide/slide.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContactComponent, OrderComponent, ProductComponent, ProductCategoryComponent, SlideComponent, FeedbackComponent, UserComponent, RoleComponent, HomeComponent, MainComponent]
})
export class MainModule { }
