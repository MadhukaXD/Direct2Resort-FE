import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ReadyToShipService } from './ready-to-ship.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-ready-to-ship',
  templateUrl: './ready-to-ship.component.html',
  styleUrls: ['./ready-to-ship.component.scss']
})
export class ReadyToShipComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isLoading: boolean = false;
  dtOptions: {};
  dtTrigger: Subject<any> = new Subject();

  readyToShipList: any;
  constructor(private readyToShipService: ReadyToShipService) { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      bLengthChange: false,
      bFilter: false
    };
    this.readyToShipPerSellerQuery();
  }

  readyToShipPerSellerQuery() {
    this.isLoading = true;
    this.readyToShipService.showReadyToShipPerSellerQuery().subscribe(
      data => {
        this.isLoading = false;
        this.readyToShipList = data;
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
