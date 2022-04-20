import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions.service';

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
  users : Observable<any> | undefined;
  items : any = [];
  infos : any = [];
  user : any = [];



  constructor(
    private route : ActivatedRoute,
    private db: AngularFirestore,
    private router:Router,
    private functions : FunctionsService
  ) { }

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
      //this.getRaltives(this.items)
      this.getAuthor(da[0].userId)
    })
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
    string = string.replace('_', ' ');
    return string;
  }

  getRaltives(item){
    console.log(item)
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
      this.infos = da;
      console.log(this.items);
    })
  }

  format(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  shorten(text: string, max: number) {
    return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join('') : text
}

}
