import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    public router: Router,
  ) { }


  redirect(){

  }

  redirection(term: any){
    this.router.navigate([term]);
  }
}
