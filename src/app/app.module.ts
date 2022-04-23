import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { BillingComponent } from './billing/billing.component';
import { LegalComponent } from './legal/legal.component';
import { CookiesComponent } from './cookies/cookies.component';
import { TermsComponent } from './terms/terms.component';
import { NotfoundComponent } from './notfound/notfound.component';
//import { MetaModule } from '@ngx-meta/core';
// Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { SubCategoryComponent } from './sub-category/sub-category.component';

import {PlatformModule} from '@angular/cdk/platform';
import { ComponentsmodalComponent } from './componentsmodal/componentsmodal.component';
import { ChooseComponent } from './choose/choose.component';

// Import library module
import { NgxSpinnerModule } from "ngx-spinner";




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    CategoryComponent,
    PrivacyComponent,
    BillingComponent,
    LegalComponent,
    CookiesComponent,
    TermsComponent,
    NotfoundComponent,
    SubCategoryComponent,
    ComponentsmodalComponent,
    ChooseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PlatformModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

