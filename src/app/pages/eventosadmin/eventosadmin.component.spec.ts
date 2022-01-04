import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosadminComponent } from './eventosadmin.component';

describe('EventosadminComponent', () => {
  let component: EventosadminComponent;
  let fixture: ComponentFixture<EventosadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
