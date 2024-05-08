import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconListrightComponent } from './icon-listright.component';


describe('IconListrightComponent', () => {
  let component: IconListrightComponent;
  let fixture: ComponentFixture<IconListrightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconListrightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconListrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
