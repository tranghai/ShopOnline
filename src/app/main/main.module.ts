import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRouter } from './main.route';
import { Routes, RouterModule } from '@angular/router';
// Modules
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';
import { FeedbackModule } from './feedback/feedback.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { RevenueModule } from './revenue/revenue.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { SlideModule } from './slide/slide.module';
import { VisitorModule } from './visitor/visitor.module';
import { UserProfileModule } from './user-profile/user-profile.module';

// Services
import { UtilityService } from '../core/services/utility.service';
import { AuthenService } from '../core/services/authen.service';
import { RevenueComponent } from './revenue/revenue.component';
import { VisitorComponent } from './visitor/visitor.component';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    ContactModule,
    FeedbackModule,
    OrderModule,
    ProductModule,
    ProductCategoryModule,
    RoleModule,
    UserModule,
    SlideModule,
    VisitorModule,
    UserProfileModule,
    RouterModule.forChild(mainRouter)
  ],
  providers: [UtilityService, AuthenService],
  declarations: [MainComponent]
})
export class MainModule { }
