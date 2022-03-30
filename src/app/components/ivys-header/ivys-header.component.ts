import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/auth/login.service';
import { IvysHeaderService } from './ivys-header.service';

@Component({
  selector: 'app-ivys-header',
  templateUrl: './ivys-header.component.html',
  styleUrls: ['./ivys-header.component.scss'],
})
export class IvysHeaderComponent implements OnInit {
  isLoggedIn: boolean;
  isCollapsed = true;
  catList: any;
  constructor(private loginService: LoginService, private elRef: ElementRef, private ivysHeaderService: IvysHeaderService) { }

  ngOnInit() {    
    this.loginService.isLoggedIn().subscribe(
      data => {
        this.isLoggedIn = data;        
      }
    );

    this.getCats();
  }

  scroll() {
    document.getElementById('ourPromise').scrollIntoView();
  }

  getCats() {
    this.ivysHeaderService.getCategoryList().subscribe(
      data => {
        this.catList = data;
      }
    )
  }
}
