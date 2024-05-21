import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardFlip } from '../../../../constants/animations';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Observable, catchError, forkJoin, of, switchMap } from 'rxjs';
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
  private snackbarService: CustomSnackbarService = inject(CustomSnackbarService)

  constructor(public dialogRef: MatDialogRef<ModalFormLoginComponent>,
  ) { }

  ngOnInit(): void {
    this.initFormLogin()
    this.initiFormRegister()
  }

  initFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'password': ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")])]
    })
  }

  initiFormRegister() {
    this.registerForm = this.formBuilder.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")])],
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
              this.snackbarService.openSucessSnackbar("Usuario logueado con éxito", "Cerrar")
              this.dialogRef.close();
            },
            error: (error) => {
              this.snackbarService.openErrorSnackbar('Contraseña incorrecta', 'Cerrar')
              console.error("Login failed", error);
            }
          });
        } else {
          this.snackbarService.openErrorSnackbar('Error, no existe nadie con ese nombre de usuario', 'Cerrar')
        }
      },
      error: (error) => {
        this.snackbarService.openErrorSnackbar('Error del servidor', 'Cerrar')
        console.error("Error checking username availability", error);
      }
    });
  }


  register() {
    const formData = this.registerForm.value;
    const encryptedPassword = this.encryptedService.encryptData(formData.password);

    const userRequest = {
      email: formData.email,
      password: encryptedPassword,
      name: formData.name,
      firstSurname: formData.firstSurname,
      lastSurname: formData.lastSurname,
      username: formData.username
    };

    this.userService.checkUsernameAvailability(formData.username).pipe(
      switchMap((res) => {
        if (!res.data) {
          return this.userService.registerUser(userRequest).pipe(
            switchMap(() => {
              return this.authService.login(formData.username, encryptedPassword);
            }),
            catchError((error) => {
              this.snackbarService.openErrorSnackbar('Error al registrarse', 'Cerrar');
              console.error('Error during registration or login', error);
              return of(null);
            })
          );
        } else {
          this.snackbarService.openErrorSnackbar('Ya existe alguien con ese usuario', 'Cerrar');
          return of(null);
        }
      }),
      catchError((error) => {
        this.snackbarService.openErrorSnackbar('Error al verificar la disponibilidad del usuario', 'Cerrar');
        console.error('Error checking username availability', error);
        return of(null);
      })
    ).subscribe((result) => {
      if (result) {
        this.snackbarService.openSucessSnackbar("Usuario registrado con éxito", "Cerrar");
        this.dialogRef.close();
      }
    });

  }
}
