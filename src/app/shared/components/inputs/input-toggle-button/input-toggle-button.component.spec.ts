import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputToggleButtonComponent } from './input-toggle-button.component';


describe('InputToggleButtonComponent', () => {
  let component: InputToggleButtonComponent;
  let fixture: ComponentFixture<InputToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputToggleButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
