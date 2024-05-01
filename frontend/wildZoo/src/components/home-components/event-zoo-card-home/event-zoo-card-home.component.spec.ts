import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventZooCardHomeComponent } from './event-zoo-card-home.component';

describe('EventZooCardHomeComponent', () => {
  let component: EventZooCardHomeComponent;
  let fixture: ComponentFixture<EventZooCardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventZooCardHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventZooCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
