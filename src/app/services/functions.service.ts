import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    public router: Router,
    public platform: Platform
  ) { }


  redirect(){

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
