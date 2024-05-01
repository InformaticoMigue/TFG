import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurAnimalsCardComponent } from './our-animals-card.component';

describe('OurAnimalsCardComponent', () => {
  let component: OurAnimalsCardComponent;
  let fixture: ComponentFixture<OurAnimalsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurAnimalsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurAnimalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
