import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardLoginComponent } from './wizard-login.component';

describe('WizardLoginComponent', () => {
  let component: WizardLoginComponent;
  let fixture: ComponentFixture<WizardLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
