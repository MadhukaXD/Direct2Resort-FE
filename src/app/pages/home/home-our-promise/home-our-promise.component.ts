import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-our-promise',
  templateUrl: './home-our-promise.component.html',
  styleUrls: ['./home-our-promise.component.scss']
})
export class HomeOurPromiseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoPromisePage(sectionName: number) {
    this.router.navigate(['/our-promise', {section: sectionName}]);
  }
}
