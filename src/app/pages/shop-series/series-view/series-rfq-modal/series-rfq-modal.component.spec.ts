import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesRfqModalComponent } from './series-rfq-modal.component';

describe('SeriesRfqModalComponent', () => {
  let component: SeriesRfqModalComponent;
  let fixture: ComponentFixture<SeriesRfqModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesRfqModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesRfqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
