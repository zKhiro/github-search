import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPackageComponent } from './icon-package.component';


describe('IconPackageComponent', () => {
  let component: IconPackageComponent;
  let fixture: ComponentFixture<IconPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
