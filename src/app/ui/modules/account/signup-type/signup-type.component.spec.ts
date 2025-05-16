import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTypeComponent } from './signup-type.component';

describe('SignupTypeComponent', () => {
  let component: SignupTypeComponent;
  let fixture: ComponentFixture<SignupTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
