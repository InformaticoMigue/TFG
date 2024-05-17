import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UserService } from '../../../service/zoo/user.service';
import { EncryptService } from '../../../service/encrypt/encrypt.service';
import { CustomSnackbarComponent } from '../../custom-snackbar/custom-snackbar.component';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField,MatLabel,MatInput,CommonModule,MatError],
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit {

  public formChangePassword:FormGroup = new FormGroup({});
  public user:any;
  private encryptedService: EncryptService = inject(EncryptService);
  private formbuilder:FormBuilder = inject(FormBuilder);
  private userService:UserService = inject(UserService);
  private customSnackbar:CustomSnackbarService = inject(CustomSnackbarService)
  private authService:AuthService = inject(AuthService)

  ngOnInit(): void {
    console.log(this.user);
    
    this.formChangePassword = this.formbuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('newPassword', 'confirmPassword')
    });
  }

  onChangePassword() {
    console.log(this.encryptedService.encryptData(this.formChangePassword.get('currentPassword')?.value));
    console.log(this.user.password)
    if (this.encryptedService.encryptData(this.formChangePassword.get('currentPassword')?.value) != this.user.password) {
      this.customSnackbar.openErrorSnackbar('La contraseña actual, y la indicada no coinciden', 'Cerrar')
      return;
    }
    const objectRequest = {
      id: this.user.id,
      username:       this.user.username,
      email:          this.user.email,
      password:       this.encryptedService.encryptData(this.formChangePassword.get('newPassword')?.value),
      name:           this.user.name,
      firstSurname:   this.user.firstSurname,
      lastSurname:    this.user.lastSurname,
    }

    this.userService.updateUser(objectRequest).subscribe({
      next: (res) => {
        this.user = res
        this.authService.login(this.user.username,this.user.password).subscribe()
        this.formChangePassword.get("currentPassword")!.setValue('')
        this.formChangePassword.get("newPassword")!.setValue('')
        this.formChangePassword.get("confirmPassword")!.setValue('')
      },
      error: (err) => {
        this.customSnackbar.openErrorSnackbar("Error del servidor", 'Cerrar')
        console.error(err);
      }
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}