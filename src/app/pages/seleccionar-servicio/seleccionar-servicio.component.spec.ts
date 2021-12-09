import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarServicioComponent } from './seleccionar-servicio.component';

describe('SeleccionarServicioComponent', () => {
  let component: SeleccionarServicioComponent;
  let fixture: ComponentFixture<SeleccionarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
