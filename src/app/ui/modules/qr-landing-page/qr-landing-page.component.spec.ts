import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrLandingPageComponent } from './qr-landing-page.component';

describe('QrLandingPageComponent', () => {
  let component: QrLandingPageComponent;
  let fixture: ComponentFixture<QrLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrLandingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
