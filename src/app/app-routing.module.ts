import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { MetaGuard } from '@ngx-meta/core';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { BillingComponent } from './billing/billing.component';
import { CookiesComponent } from './cookies/cookies.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LegalComponent } from './legal/legal.component';
import { ChooseComponent } from './choose/choose.component';

const routes: Routes = [
   { 
    path: 'home', 
    component: HomeComponent 
    },
    { 
    path: 'product', 
    component: ProductComponent,
     data: {
      meta: {
        title: 'Sweet home',
        override: true,
        description: 'Home, home sweet home... and what?'
      }
    } 
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
      path: 'legal', 
      component: LegalComponent 
    },
    { 
      path: 'cookies', 
      component: CookiesComponent 
    },
    { 
      path: 'choose', 
      component: ChooseComponent 
    },
    { 
      path: 'notfound', 
      component: NotfoundComponent 
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'notfound'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
