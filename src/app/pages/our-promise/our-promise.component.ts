import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-our-promise',
  templateUrl: './our-promise.component.html',
  styleUrls: ['./our-promise.component.scss']
})
export class OurPromiseComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const sectionId = this.route.snapshot.paramMap.get('section');
    this.selectTab(parseInt(sectionId));
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }
}
