import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  item: any;
  sub: any;
  categories : any = [];

  productsCollection : AngularFirestoreCollection<any[]> | undefined;
  products : Observable<any> | undefined;
  items : any = [];

  name_filtered_items: Array<any> | undefined;
  public goalList: any = [];
  public loadedGoalList: any[] | undefined;
  info: any;
  searchValue : any;

  constructor(
    private route : ActivatedRoute,
    private db: AngularFirestore,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.sub = this.route
    .queryParams
    .subscribe( params  => {
     // console.log(params['item'])
     this.item = params['item'];
     this.getproducts(this.item);
        });
  }

  format(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  replace(string: any){
    //string = string.replace('_', ' ');
    string = string.split('_').join(' ');
    return string;
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

  initializeItems(): void {
    this.items = this.loadedGoalList;
  }

  searchSub(item){
    this.items = [];
    this.items = [];
    console.log(item)
    this.productsCollection = this.db.collection('products', ref => ref.where('subCategory', '==', item));
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

  getproducts(item){
    this.items = [];
    console.log(item)
    this.productsCollection = this.db.collection('products', ref => ref.where('category', '==', item));
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
    items.forEach((elt: any)=>{
      let cat = {
        title : elt.subCategory,
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


  checkExist(elt: any, tab: any){
    let state = false;
    for (let i=0;i<tab.length;i++){
      if(elt.subCategory == tab[i].title){
        tab[i].qte = tab[i].qte+1;
        state = true;
      }
    } 
    return state;
  }

  goToCategory(category: any){
    this.router.navigate(['/category'], { queryParams: {
      item: category,
       }
     });
  }

  goToProduct(product){
    this.router.navigate(['/product'], { queryParams: {
      item: product,
       }
     });
  }

}
