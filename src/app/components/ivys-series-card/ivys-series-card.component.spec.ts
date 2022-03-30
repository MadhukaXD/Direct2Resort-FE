import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysSeriesCardComponent } from './ivys-series-card.component';

describe('IvysSeriesCardComponent', () => {
  let component: IvysSeriesCardComponent;
  let fixture: ComponentFixture<IvysSeriesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysSeriesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysSeriesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
