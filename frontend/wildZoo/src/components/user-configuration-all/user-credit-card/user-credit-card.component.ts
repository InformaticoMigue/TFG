import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CreditCard, User } from '../../../assets/types';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../service/zoo/user.service';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-user-credit-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-credit-card.component.html',
  styleUrls: ['./user-credit-card.component.scss'],
})

export class UserCreditCardComponent implements OnInit {
  public isFlipped = false;
  @Input() creditCardData!: CreditCard;
  @Input() user!:User;
  public numberFormated!: string;
  public formCreditCard: FormGroup = new FormGroup({});
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    this.formCreditCard = this.formBuilder.group({
      id: [''],
      titular: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u00FF\s'.-]*$/)]],
      number: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      dateOfExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });

    if (this.creditCardData) {
      this.formCreditCard.patchValue({
        id: this.creditCardData.id,
        titular: this.creditCardData.titular,
        number: this.formatCardNumber(this.creditCardData.number.toString()),
        dateOfExpiry: this.creditCardData.expirationDate.replace(/-/g, '/'),
        cvv: this.creditCardData.cvv.toString()
      });
    }
  }

  formatCardNumber(number: string): string {
    return number.replace(/\D+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

  formatExpiryDate(date: string): string {
    return date.replace(/\D+/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
  }

  handleInput(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
    let formattedValue = input.value;
    if (fieldName === 'number') {
      formattedValue = this.formatCardNumber(input.value);
    } else if (fieldName === 'dateOfExpiry') {
      formattedValue = this.formatExpiryDate(input.value);
    }
    input.value = formattedValue;
    this.formCreditCard.get(fieldName)?.setValue(formattedValue, { emitEvent: false });
  }

  save() {
    const objectToRequest = {
      id: this.formCreditCard.get('id')?.value,
      titular: this.formCreditCard.get('titular')?.value,
      number: +this.formCreditCard.get('number')?.value.replace(/\s+/g, ''), // Remove spaces for number
      expirationDate: this.formCreditCard.get('dateOfExpiry')?.value.replace('/', '-'), // Format date
      cvv: this.formCreditCard.get('cvv')?.value,
      balance: 2000, 
      user: this.user
    };

    this.userService.updateCreditCard(objectToRequest).subscribe({
      next: (response) => console.log('Updated Successfully:', response),
      error: (error) => console.error('Update Failed:', error)
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
