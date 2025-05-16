import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitingDetailsComponent } from './visiting-details.component';

describe('VisitingDetailsComponent', () => {
  let component: VisitingDetailsComponent;
  let fixture: ComponentFixture<VisitingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
