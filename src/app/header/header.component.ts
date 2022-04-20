import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private functions : FunctionsService,
    public platform: Platform
  ) { }

  ngOnInit(): void {
  }

  redirect(){
    this.functions.checkPlatform();
  }

}
