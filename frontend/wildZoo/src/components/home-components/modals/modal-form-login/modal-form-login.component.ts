import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardFlip } from '../../../../constants/animations';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { UserService } from '../../../../service/zoo/user.service';
import { User } from '../../../../assets/types';
import { MatDialogRef } from '@angular/material/dialog';
import { EncryptService } from '../../../../service/encrypt/encrypt.service';
import { StorageService } from '../../../../service/storage/storage.service';
import { AuthService } from '../../../../service/auth/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackbarService } from '../../../../service/snackbar/custom-snackbar.service';

@Component({
  selector: 'app-modal-form-login',
  standalone: true,
  animations: [CardFlip],
  imports: [ReactiveFormsModule, CommonModule, MatButton, MatFormFieldModule, MatInputModule, FormsModule, MatInput],
  templateUrl: './modal-form-login.component.html',
  styleUrl: './modal-form-login.component.scss'
})
export class ModalFormLoginComponent implements OnInit {
  public flip: string = 'inactive';
  public profile: any;
  private formBuilder = inject(FormBuilder)
  public formLogin: any;
  private userService: UserService = inject(UserService);
  public usernameExists: boolean = true;
  public passwordExists: boolean = true;
  private encryptedService: EncryptService = inject(EncryptService);
  private authService: AuthService = inject(AuthService)
  public registerForm: FormGroup = new FormGroup({});
  private snackbarService:CustomSnackbarService = inject(CustomSnackbarService)

  constructor(public dialogRef: MatDialogRef<ModalFormLoginComponent>,
  ) { }

  ngOnInit(): void {
    this.initFormLogin()
    this.initiFormRegister()
  }

  initFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")]]
    })
  }

  initiFormRegister() {
    this.registerForm = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(3)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")]],
      'name': ['', [Validators.required]],
      'firstSurname': ['', [Validators.required]],
      'lastSurname': ['', [Validators.required]]
    });
  }

  cardClicked() {
     this.flip = this.flip == 'inactive' ? 'active' : 'inactive';
  }

  login() {
    const username = this.formLogin.get("username").value;
    const password = this.formLogin.get("password").value;

    this.userService.checkUsernameAvailability(username).subscribe({
      next: (response) => {
        if (response.data) {
          const encryptedPassword = this.encryptedService.encryptData(password);
          this.authService.login(username, encryptedPassword).subscribe({
            next: (value) => {
              this.snackbarService.openSucessSnackbar("Usuario logueado correctamente", "Cerrar")
              this.dialogRef.close();
            },
            error: (error) => {
              this.snackbarService.openErrorSnackbar('Error del servidor', 'Cerrar')
              console.error("Login failed", error);
            }
          });
        } else {
          this.snackbarService.openErrorSnackbar('Error, no existe nadie con es nombre de usuario', 'Cerrar')
        }
      },
      error: (error) => {
        this.snackbarService.openErrorSnackbar('Error del servidor', 'Cerrar')
        console.error("Error checking username availability", error);
      }
    });
  }


  register() {
    const objectToRequest = {
      id: null,
      email: this.registerForm.get('email')?.value,
      password: this.encryptedService.encryptData(this.registerForm.get('password')?.value),
      name: this.registerForm.get('name')?.value,
      firstSurname: this.registerForm.get('firstSurname')?.value,
      lastSurname: this.registerForm.get('lastSurname')?.value,
      username: this.registerForm.get('username')?.value,
      creditCard: null,
      tickets: null,
      adoptions: null,
      packageSales: null
    }

    this.userService.checkUsernameAvailability(this.registerForm.get('username')?.value).subscribe((res) => {
      if (!res.data) {
        this.userService.updateUser(objectToRequest).subscribe({
          next: () => {
            this.authService.login(this.registerForm.get('username')?.value, this.encryptedService.encryptData(this.registerForm.get('password')?.value)).subscribe({
              next:() => {
                this.snackbarService.openSucessSnackbar("Usuario logueado correctamente", "Cerrar")
                this.dialogRef.close()
              },
              error:(error) => {
                this.snackbarService.openErrorSnackbar('Error del servidor', 'Cerrar')
                console.log('Error to authenticate user',error)    
              }
            })
          },
          error: (error) => {
            this.snackbarService.openErrorSnackbar('Error del servidor', 'Cerrar')
            console.log('Error to update user',error)
          }  
        })
      } else {
        this.snackbarService.openErrorSnackbar('Error, Ya existe alguien con ese usuario', 'Cerrar')
      }
    })

  }
}
