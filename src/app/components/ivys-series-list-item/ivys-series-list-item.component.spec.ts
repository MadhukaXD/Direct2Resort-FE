import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysSeriesListItemComponent } from './ivys-series-list-item.component';

describe('IvysSeriesListItemComponent', () => {
  let component: IvysSeriesListItemComponent;
  let fixture: ComponentFixture<IvysSeriesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysSeriesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysSeriesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
