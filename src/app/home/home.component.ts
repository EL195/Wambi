import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import { FunctionsService } from '../services/functions.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
   this.getproducts();
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
   
    this.productsCollection = this.db.collection('products');
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
      //console.log(this.items);
      this.goalList = da;
      this.loadedGoalList = da;
      this.getCategories(this.items);
    })
  }


  getCategories(items: any) {
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
    return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join('') : text
}

  initializeItems(): void {
    this.items = this.loadedGoalList;
  }

}
