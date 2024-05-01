import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceZooCardComponent } from './service-zoo-card.component';

describe('ServiceZooCardComponent', () => {
  let component: ServiceZooCardComponent;
  let fixture: ComponentFixture<ServiceZooCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceZooCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceZooCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
