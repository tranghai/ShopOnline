import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

export const mainRouter: Routes = [
    {
        path: '', component: MainComponent, children: [

            { path: '', redirectTo: 'home', pathMatch: 'full' },

            { path: 'home', loadChildren: './home/home.module#HomeModule' },

            { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },

            { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackModule' },

            { path: 'order', loadChildren: './order/order.module#OrderModule' },

            { path: 'product', loadChildren: './product/product.module#ProductModule' },

            { path: 'product-category', loadChildren: './product-category/product-category.module#ProductCategoryModule' },

            { path: 'role', loadChildren: './role/role.module#RoleModule' },
            
            { path: 'slide', loadChildren: './slide/slide.module#SlideModule' },

            { path: 'user', loadChildren: './user/user.module#UserModule' },

            { path: 'visitor', loadChildren: './visitor/visitor.module#VisitorModule' },

            { path: 'revenue', loadChildren: './revenue/revenue.module#RevenueModule' },

            { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfileModule' },
        ]
    }
];