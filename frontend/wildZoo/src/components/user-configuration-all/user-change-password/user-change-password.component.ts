import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UserService } from '../../../service/zoo/user.service';
import { EncryptService } from '../../../service/encrypt/encrypt.service';
import { CustomSnackbarComponent } from '../../custom-snackbar/custom-snackbar.component';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';
import { AuthService } from '../../../service/auth/auth.service';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField,MatLabel,MatInput,CommonModule,MatError],
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit {

  public  formChangePassword:FormGroup = new FormGroup({});
  public  user:any;
  private encryptedService: EncryptService = inject(EncryptService);
  private formbuilder:FormBuilder = inject(FormBuilder);
  private userService:UserService = inject(UserService);
  private customSnackbar:CustomSnackbarService = inject(CustomSnackbarService)
  private authService:AuthService = inject(AuthService)
  private location: Location = inject(Location);

  ngOnInit(): void {    
    this.formChangePassword = this.formbuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z\\d!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]{8,}$")])],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('newPassword', 'confirmPassword')
    });
  }

  updateUrlWithToken(newToken: string) {
    const currentPath = this.location.path(); 
    const basePath = currentPath.split('/').slice(0, -1).join('/'); 
    const newPath = `${basePath}/${newToken}`;
    this.location.replaceState(newPath);
  }  


  onChangePassword() {
    if (this.encryptedService.encryptData(this.formChangePassword.value.currentPassword) !== this.user.password) {
      this.customSnackbar.openErrorSnackbar('La contraseña actual no coincide', 'Cerrar');
      return;
    }

    const encryptedPassword = this.encryptedService.encryptData(this.formChangePassword.value.newPassword);
    const objectRequest = {id: this.user.id, password: encryptedPassword };    

    this.userService.updateUser(objectRequest).pipe(
      switchMap(res => {
        Object.assign(this.user,res.data)
        return this.authService.login(this.user.username, encryptedPassword);
      })
    ).subscribe({
      next: res => {
        this.updateUrlWithToken(res);
        this.customSnackbar.openSucessSnackbar("Contraseña cambiada con éxito", 'Cerrar');
      },
      error: err => {
        this.customSnackbar.openErrorSnackbar("Error del servidor", 'Cerrar');
        console.error("Error updating user", err);
      }
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      console.log(control?.value,matchingControl?.value);
      
      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      matchingControl?.setErrors(control?.value === matchingControl.value ? null : { mustMatch: true });
    };
  }

}