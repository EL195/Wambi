import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import { FunctionsService } from '../services/functions.service';
import { NgxSpinnerService } from "ngx-spinner";
import en from 'src/assets/json/en';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chaines : any = en.translation;
  productsCollection : AngularFirestoreCollection<any[]> | undefined;
  products : Observable<any> | undefined;
  items : any = [];
  categories : any = [];
  searchValue : any;

  name_filtered_items: Array<any> | undefined;
  public goalList: any = [];
  public loadedGoalList: any[] | undefined;
  info: any;

  constructor(
    private router:Router,
    private db: AngularFirestore,
    private functions : FunctionsService,
    private spinner: NgxSpinnerService,
    //private chaines : en
  ) { }

  ngOnInit(): void {
    //console.log(this.chaines.translation);
    this.spinner.show();
   this.getproducts();
  }

  placeTo(item){
   return this.functions.translate(item);
  }


  test(){
    this.router.navigate(['/product'], { queryParams: {
    //  item: item,
     // type : "read",
    //  typo : this.type
       }
     });
  }

  getproducts(){
    this.items = [];
    //this.productsCollection = this.db.collection('products').orderBy("name", "desc");
    this.productsCollection = this.db.collection('products', ref => ref.orderBy("create_at", "desc"));
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
      this.items = da;
      console.log(this.items);
      this.goalList = da;
      this.loadedGoalList = da;
      this.getCategories(this.items);
    })
  }


  getCategories(items: any) {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      items.forEach((elt: any)=>{
        let cat = {
          title : elt.category,
          qte : 1
        }
        if(this.categories.length<1){
          this.categories.push(cat);
        }
        else{
          if(this.checkExist(elt, this.categories)==false){
            this.categories.push(cat);
          }
  
        }
      });
      console.log(this.categories);
      this.spinner.hide();
    }, 5000);
    

  }

  replace(string: any){
    string = string.replace('_', ' ');
    return string;
  }


  redirect(){
    this.functions.redirect();
  }

  goToCategory(category: any){
    //console.log(category);
    this.router.navigate(['/category'], { queryParams: {
      item: category,
       }
     });
  }

  goToProduct(produit: any){
    //console.log(produit);
    this.router.navigate(['/product'], { queryParams: {
      item: produit,
       }
     });
  }


format(price){
  if(price!=undefined){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}

findOs(){
  this.functions.checkPlatform();
}


  checkExist(elt: any, tab: any){
    let state = false;
    for (let i=0;i<tab.length;i++){
      if(elt.category == tab[i].title){
        tab[i].qte = tab[i].qte+1;
        state = true;
      }
    } 
    return state;
  }



  filterList() {
    this.initializeItems();
    const searchTerm = this.searchValue;
   // console.log(searchTerm)
    if (!searchTerm) {
      return;
    }
    console.log(searchTerm)
    //this.search = true;
   // console.log(this.search)
    //console.log(this.goalList);
    this.items = this.goalList.filter((currentGoal: any) => {
      console.log(currentGoal);
      if (currentGoal.details.title && searchTerm) {
        //console.log(currentGoal.fName)
        if (currentGoal.details.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          console.log(currentGoal.title)
          return true;
        }
        //console.log(currentGoal.fName)
        return false;
      }
    });
  }

  shorten(text: string, max: number) {
    return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') + '...' : text
}

  initializeItems(): void {
    this.items = this.loadedGoalList;
  }

}
