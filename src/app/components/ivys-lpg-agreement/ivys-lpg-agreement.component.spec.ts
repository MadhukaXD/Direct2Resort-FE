import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysLpgAgreementComponent } from './ivys-lpg-agreement.component';

describe('IvysLpgAgreementComponent', () => {
  let component: IvysLpgAgreementComponent;
  let fixture: ComponentFixture<IvysLpgAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysLpgAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysLpgAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
