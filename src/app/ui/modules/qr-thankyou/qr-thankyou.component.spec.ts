import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrThankyouComponent } from './qr-thankyou.component';

describe('QrThankyouComponent', () => {
  let component: QrThankyouComponent;
  let fixture: ComponentFixture<QrThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrThankyouComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
