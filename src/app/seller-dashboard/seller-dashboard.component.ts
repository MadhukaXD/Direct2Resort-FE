import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

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
