import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SubmitedLpListService } from './submited-lp-list.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-submited-lp-list',
  templateUrl: './submited-lp-list.component.html',
  styleUrls: ['./submited-lp-list.component.scss']
})
export class SubmitedLpListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  
  isLoading: boolean = false;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();
  quoteList: any;

  constructor(private submitedLpListService: SubmitedLpListService) { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };

    this.getSubmitedToShipItems();
  }

  getSubmitedToShipItems() {
    this.submitedLpListService.getSubmitedToShipItems().subscribe(
      data => {
        this.quoteList = data;
        this.rerender();
      }
    )
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
