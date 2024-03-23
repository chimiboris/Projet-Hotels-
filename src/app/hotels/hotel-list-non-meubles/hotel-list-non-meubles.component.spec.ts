import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListNonMeublesComponent } from './hotel-list-non-meubles.component';

describe('HotelListNonMeublesComponent', () => {
  let component: HotelListNonMeublesComponent;
  let fixture: ComponentFixture<HotelListNonMeublesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelListNonMeublesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListNonMeublesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
