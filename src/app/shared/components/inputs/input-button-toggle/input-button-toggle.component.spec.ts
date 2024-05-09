import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputButtonToggleComponent } from './input-button-toggle.component';


describe('InputButtonToggleComponent', () => {
  let component: InputButtonToggleComponent;
  let fixture: ComponentFixture<InputButtonToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputButtonToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
