import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResultCardComponent } from './user-result-card.component';


describe('UserResultCardComponent', () => {
  let component: UserResultCardComponent;
  let fixture: ComponentFixture<UserResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserResultCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
