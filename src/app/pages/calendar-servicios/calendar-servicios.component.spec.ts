import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarServiciosComponent } from './calendar-servicios.component';

describe('CalendarServiciosComponent', () => {
  let component: CalendarServiciosComponent;
  let fixture: ComponentFixture<CalendarServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
