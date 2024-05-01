import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurAnimalsComponent } from './our-animals.component';

describe('OurAnimalsComponent', () => {
  let component: OurAnimalsComponent;
  let fixture: ComponentFixture<OurAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurAnimalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
