import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListMeublesComponent } from './hotel-list-meubles.component';

describe('HotelListMeublesComponent', () => {
  let component: HotelListMeublesComponent;
  let fixture: ComponentFixture<HotelListMeublesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelListMeublesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListMeublesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
