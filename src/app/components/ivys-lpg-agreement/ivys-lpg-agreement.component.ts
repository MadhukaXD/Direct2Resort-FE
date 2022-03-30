import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ivys-lpg-agreement',
  templateUrl: './ivys-lpg-agreement.component.html',
  styleUrls: ['./ivys-lpg-agreement.component.scss']
})
export class IvysLpgAgreementComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
