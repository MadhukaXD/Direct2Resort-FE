import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-dashboard-sidebar',
  templateUrl: './buyer-dashboard-sidebar.component.html',
  styleUrls: ['./buyer-dashboard-sidebar.component.scss']
})
export class BuyerDashboardSidebarComponent implements OnInit {

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
