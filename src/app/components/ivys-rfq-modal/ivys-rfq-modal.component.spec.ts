import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysRfqModalComponent } from './ivys-rfq-modal.component';

describe('IvysRfqModalComponent', () => {
  let component: IvysRfqModalComponent;
  let fixture: ComponentFixture<IvysRfqModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysRfqModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysRfqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
