import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  cookies: any | null;
  canceled : boolean  = false;

  constructor(
    private functions : FunctionsService,
  ) { }

  ngOnInit(): void {
    this.cookies = localStorage.getItem('cookies');
  }

  

  allow(){
    let cookies = {
      enable : true
    }
    localStorage.setItem('cookies', JSON.stringify(cookies));
    this.cookies = localStorage.getItem('cookies');
  }


  cancel(){
    let cookies = {
      enable : false
    }
    localStorage.setItem('cookies', JSON.stringify(cookies));
    this.cookies = localStorage.getItem('cookies');
  }
  

  redirectTo(term : any){
      this.functions.redirection(term);
  }


}
