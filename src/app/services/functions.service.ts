import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import en from 'src/assets/json/en';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  chaines : any = en.translation;


  constructor(
    public router: Router,
    public platform: Platform
  ) { }


  redirect(){

  }

  translate(item){
    //console.log("test ici :", item)
    //console.log(obj[name]);
    ///console.log(this.chaines[item]);
    return this.chaines[item];

  }

  redirection(term: any){
    this.router.navigate([term]);
  }

  checkPlatform(){
    console.log(this.platform);
    if (this.platform.IOS) {
      this.appstore();
    }
    if(this.platform.ANDROID){
      this.playstore();
    }
    if(this.platform.isBrowser){
      this.choose();
    }
  }

  appstore(){
    window.open("https://apps.apple.com/cm/app/wambi/id1592188364", "_blank");
  }
  playstore(){
    window.open("https://play.google.com/store/apps/details?id=com.wambi", "_blank");
  }

  choose(){
    this.router.navigate(['choose']);
  }
}
