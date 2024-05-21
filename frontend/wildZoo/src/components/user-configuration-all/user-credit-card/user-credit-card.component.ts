import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CreditCard, User } from '../../../assets/types';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../../service/zoo/user.service';
import { AuthService } from '../../../service/auth/auth.service';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';

@Component({
  selector: 'app-user-credit-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-credit-card.component.html',
  styleUrls: ['./user-credit-card.component.scss'],
})

export class UserCreditCardComponent implements OnInit {
  public isFlipped = false;
  public creditCardData!: CreditCard | null;
  private user!: User;
  public numberFormated!: string;
  public formCreditCard: FormGroup = new FormGroup({});
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private snackbarService: CustomSnackbarService = inject(CustomSnackbarService);

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    this.formCreditCard = this.formBuilder.group({
      id: [''],
      titular: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z\u00C0-\u00FF\s'.-]*$/)])],
      number: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)])],
      dateOfExpiry: ['', Validators.compose([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),this.monthYearGreaterThanCurrent()])],
      cvv: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });

    if (this.creditCardData) {
      this.formCreditCard.patchValue({
        id: this.creditCardData.id,
        titular: this.creditCardData.titular,
        number: this.formatCardNumber(this.creditCardData.number),
        dateOfExpiry: this.creditCardData.expirationDate.replace(/-/g, '/'),
        cvv: this.creditCardData.cvv
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

  private monthYearGreaterThanCurrent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
  
      const parts = value.split('/');
      if (parts.length !== 2) {
        return { 'invalidFormat': true };
      }
  
      const inputMonth = parseInt(parts[0], 10);
      const inputYear = parseInt(parts[1], 10); 
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; 
      const currentYear = currentDate.getFullYear() % 100;   

      if (inputYear < currentYear) {
        return { 'yearNotGreaterThanCurrent': true };
      } else if (inputYear === currentYear) {
        if (inputMonth <= currentMonth) {
          return { 'monthNotGreaterThanCurrent': true };
        }
      }
      return null;
    };
  }
  

  save() {
    const objectToRequest = {
      id: this.formCreditCard.get('id')?.value,
      titular: this.formCreditCard.get('titular')?.value,
      number: this.formCreditCard.get('number')?.value.replace(/\s+/g, ''),
      expirationDate: this.formCreditCard.get('dateOfExpiry')?.value.replace('/', '-'), // Format date
      cvv: this.formCreditCard.get('cvv')?.value,
      user: {
        id: this.user.id
      }
    };

    this.userService.updateCreditCard(objectToRequest).subscribe({
      next: (response) => {
        this.snackbarService.openSucessSnackbar("Tarjeta de credito actualizada", "Cerrar")
        this.creditCardData = response.data                
      },
      error: (error) => {
        this.snackbarService.openErrorSnackbar("Error del servidor", "Cerrar")
      }
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  isAvailableToDelete() {
    return this.creditCardData
  }

  public resetForm() {
    this.formCreditCard.patchValue({
      id: '',
      titular: '',
      number: '',
      dateOfExpiry: '',
      cvv: '',
    });
  }

  delete() {
    this.userService.deleteCreditCard(this.creditCardData!.id).subscribe({
      next: () => {
        this.resetForm();        
        this.snackbarService.openSucessSnackbar("Tarjeta de credito eliminada", "Cerrar")
        this.creditCardData = null;
      },
      error: () => {
        this.snackbarService.openErrorSnackbar("Error del servidor", "Cerrar")
      }
    });

  }
}
