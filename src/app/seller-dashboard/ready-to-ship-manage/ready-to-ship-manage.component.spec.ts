import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToShipManageComponent } from './ready-to-ship-manage.component';

describe('ReadyToShipManageComponent', () => {
  let component: ReadyToShipManageComponent;
  let fixture: ComponentFixture<ReadyToShipManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyToShipManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyToShipManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
