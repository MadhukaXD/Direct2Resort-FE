import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logistic-partner-sidebar',
  templateUrl: './logistic-partner-sidebar.component.html',
  styleUrls: ['./logistic-partner-sidebar.component.scss']
})
export class LogisticPartnerSidebarComponent implements OnInit {

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
