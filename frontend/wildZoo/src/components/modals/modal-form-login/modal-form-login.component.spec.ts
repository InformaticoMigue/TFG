import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormLoginComponent } from './modal-form-login.component';

describe('ModalFormLoginComponent', () => {
  let component: ModalFormLoginComponent;
  let fixture: ComponentFixture<ModalFormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFormLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
