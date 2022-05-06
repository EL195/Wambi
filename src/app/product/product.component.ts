import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions.service';

import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { threadId } from 'worker_threads';
import { NgxSpinnerService } from 'ngx-spinner';
//import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 
  sub: any;

  productsCollection : AngularFirestoreCollection<any[]> | undefined;
  productsRCollection : AngularFirestoreCollection<any[]> | undefined;
  userCollection : AngularFirestoreCollection<any[]> | undefined;
  productsR : Observable<any> | undefined;
  products : Observable<any> | undefined;
  auteurs : Observable<any> | undefined;
  auteurCollection : AngularFirestoreCollection<any[]> | undefined;
  auteurAll : any = [];
  users : Observable<any> | undefined;
  items : any = [];
  infos : any = [];
  info : any = [];
  user : any = [];
  auth: any = [];
  commentaires : any = [];
  





  constructor(
    private route : ActivatedRoute,
    private db: AngularFirestore,
    private spinner: NgxSpinnerService,
    private router:Router,
    private functions : FunctionsService,
    private title: Title, 
    private meta: Meta
  ) { 
    
    this.auteurCollection = this.db.collection('users');
    this.auteurs = this.auteurCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      })
    );
    this.auteurs.subscribe(da=>{
      this.auteurAll = da;
      console.log(this.auteurAll);
    })
  }

  ngOnInit(): void {
    this.sub = this.route
    .queryParams
    .subscribe( params  => {
      let ite = parseInt(params['item']);
     this.getproducts(ite);
        });
  }

  redirect(){
    this.functions.checkPlatform();
  }
  

  updateTitle(title: string){
    this.title.setTitle(title);
  }
  updateMetaTags(metaTags: MetaDefinition[]){
    metaTags.forEach(m=> this.meta.updateTag(m));
  }


  getproducts(item: any) {
    console.log(item)
    this.productsCollection = this.db.collection('products', ref => ref.where('uid', '==', item));
    this.products = this.productsCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      })
    );
    this.products.subscribe(da=>{
      this.items = da[0];
      console.log(da[0].userId);
      let b_url = "https://wambi.pondocreativ.com/product?item="+this.items.id;
      this.title.setTitle(this.items.details.title);
      this.meta.updateTag({ property: 'og:title', content: this.items.details.title });
      this.meta.updateTag({property: 'og:description', content: this.shorten(this.items.details.description, 100)});
      this.meta.updateTag({ property: 'og:image', content: this.items.photos[0], itemprop: 'image' });
      this.meta.updateTag({ property: 'og:image:url', content: this.items.photos[0], itemprop: 'image' });
      this.meta.updateTag({ property: 'og:image:type', content: 'image/png' });
      this.meta.updateTag({ property: 'og:url', b_url });
      this.getAuthor(da[0].userId)
    })
  }

/*   getTheAuthor(){
    this.auteurCollection = this.db.collection('users');
    this.auteurs = this.auteurCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      })
    );
    this.auteurs.subscribe(da=>{
      this.auteur = da;
      console.log(this.auteur);
    })
    
  } */

  foundAuthor(user){
   // console.log(this.auteurAll)
    this.auteurAll.forEach(element => {
      //console.log("Test", element);
      if(element.userId==user){
        this.auth = element;
        console.log(this.auth)
      }
    });
    //console.log(this.auth)
    return this.auth;
  }

  getAuthor(id){
    this.userCollection = this.db.collection('users', ref => ref.where('userId', '==', id));
    this.users = this.userCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      })
    );
    this.users.subscribe(da=>{
      this.user = da[0];
      console.log(this.user);
      this.getRaltives(this.items)
    })
  }


  replace(string: any){
    string = string.toString().replace('_', ' ');
    return string;
  }


   placeTo(item){
   return this.functions.translate(item);
  }

  getRaltives(item){
    //sconsole.log(item)
    this.productsRCollection = this.db.collection('products', ref => ref.where('subCategory', '==', item.subCategory));
    this.productsR = this.productsRCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      })
    );
    this.productsR.subscribe(da=>{
      console.log("relative", da)
      let ob = item;
      da = da.filter(item => item.id !== ob.id);
      this.infos = da;
      //this.getTheAuthor();
    })

    setTimeout(() => {
      /** spinner ends after 5 seconds */
     // console.log(this.categories);
      this.spinner.hide();
    }, 2000);
  }



  format(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  shorten(text: string, max: number) {
    //return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join('') : text
    return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') + '...' : text
}

}


