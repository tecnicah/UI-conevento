import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCarouselGeneralComponent } from './slide-carousel-general.component';

describe('SlideCarouselGeneralComponent', () => {
  let component: SlideCarouselGeneralComponent;
  let fixture: ComponentFixture<SlideCarouselGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideCarouselGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCarouselGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
