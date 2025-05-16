import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDetailsComponent } from './qr-details.component';

describe('QrDetailsComponent', () => {
  let component: QrDetailsComponent;
  let fixture: ComponentFixture<QrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
