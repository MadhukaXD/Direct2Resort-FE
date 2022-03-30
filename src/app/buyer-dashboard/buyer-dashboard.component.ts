import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menuToggle(e) {
    console.log(e);
    if(e.srcElement.parentElement.classList.contains('closed')){
      e.srcElement.parentElement.classList.remove('closed');
      e.srcElement.parentElement.classList.add('opened');
    } else {
      e.srcElement.parentElement.classList.remove('opened');
      e.srcElement.parentElement.classList.add('closed');
    }
  }
}
