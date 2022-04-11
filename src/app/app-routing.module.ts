import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { BillingComponent } from './billing/billing.component';
import { CookiesComponent } from './cookies/cookies.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
   { 
    path: 'home', 
    component: HomeComponent 
    },
    { 
    path: 'product', 
    component: ProductComponent 
    },
    { 
      path: 'category', 
      component: CategoryComponent 
    },
    { 
      path: 'terms', 
      component: TermsComponent 
    },
    { 
      path: 'privacy', 
      component: PrivacyComponent 
    },
    { 
      path: 'billing', 
      component: BillingComponent 
    },
    { 
      path: 'cookies', 
      component: CookiesComponent 
    },
    { 
      path: 'notfound', 
      component: NotfoundComponent 
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'notfound'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }