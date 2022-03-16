import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-dashboard-sidebar',
  templateUrl: './seller-dashboard-sidebar.component.html',
  styleUrls: ['./seller-dashboard-sidebar.component.scss']
})
export class SellerDashboardSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(e) {
    if(e.srcElement.classList.contains('nav-item')){
      if(e.srcElement.parentElement.lastElementChild.classList.contains('expanded')) {
        e.srcElement.parentElement.lastElementChild.classList.remove('expanded');
        e.srcElement.lastElementChild.style.transform = 'rotate(0deg)';
      } else {
        e.srcElement.parentElement.lastElementChild.classList.add('expanded');
        e.srcElement.lastElementChild.style.transform = 'rotate(180deg)';
      }
    }
  }
}
