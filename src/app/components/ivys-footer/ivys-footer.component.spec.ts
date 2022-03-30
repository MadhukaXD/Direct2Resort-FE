import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvysFooterComponent } from './ivys-footer.component';

describe('IvysFooterComponent', () => {
  let component: IvysFooterComponent;
  let fixture: ComponentFixture<IvysFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvysFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvysFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
