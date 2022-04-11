import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  datasCollection!: AngularFirestoreCollection<any[]>;
  datas!: Observable<any>;
  
  constructor(
    private db: AngularFirestore,
  ) { }


  getDatas() {
    console.log("ici")
    this.datasCollection = this.db.collection('products');
      this.datas = this.datasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
        })
      );
    return this.datas;
  }
}
