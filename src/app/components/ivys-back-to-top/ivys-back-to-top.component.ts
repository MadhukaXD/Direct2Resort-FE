import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-ivys-back-to-top',
  templateUrl: './ivys-back-to-top.component.html',
  styleUrls: ['./ivys-back-to-top.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('0.8s ease-out', 
                    style({  opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.4s ease-out', 
                    style({  opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class IvysBackToTopComponent implements OnInit {
  showBackToTopBtn: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  scrollToTop(e: any) {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  @HostListener('window:scroll') watchScroll() {
    if(window.scrollY > 150) {
      this.showBackToTopBtn = true;
    } else {
      this.showBackToTopBtn = false;
    }
  }
}
