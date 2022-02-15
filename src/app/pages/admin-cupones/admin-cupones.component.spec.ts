import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCuponesComponent } from './admin-cupones.component';

describe('AdminCuponesComponent', () => {
  let component: AdminCuponesComponent;
  let fixture: ComponentFixture<AdminCuponesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCuponesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
