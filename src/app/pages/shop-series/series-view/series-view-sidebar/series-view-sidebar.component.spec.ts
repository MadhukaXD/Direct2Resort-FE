import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesViewSidebarComponent } from './series-view-sidebar.component';

describe('SeriesViewSidebarComponent', () => {
  let component: SeriesViewSidebarComponent;
  let fixture: ComponentFixture<SeriesViewSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesViewSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesViewSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
