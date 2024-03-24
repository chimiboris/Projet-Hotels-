import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapiolconceptComponent } from './mapiolconcept.component';

describe('MapiolconceptComponent', () => {
  let component: MapiolconceptComponent;
  let fixture: ComponentFixture<MapiolconceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapiolconceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapiolconceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
