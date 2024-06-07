import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardFlip } from '../../../../constants/animations';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { catchError, of, switchMap } from 'rxjs';
import { UserService } from '../../../../service/zoo/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EncryptService } from '../../../../service/encrypt/encrypt.service';
import { AuthService } from '../../../../service/auth/auth.service';
import { CustomSnackbarService } from '../../../../service/snackbar/custom-snackbar.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-modal-form-login',
  standalone: true,
  animations: [CardFlip],
  imports: [ReactiveFormsModule, CommonModule, MatButton, FontAwesomeModule, MatFormFieldModule, MatInputModule, FormsModule, MatInput],
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
  public checkIcon:IconDefinition = faCheckCircle;
  public crossIcon: IconDefinition = faCircleXmark;
  private snackbarService: CustomSnackbarService = inject(CustomSnackbarService)
  infoUserPasswordValid = [
    
    {
      id:1,
      description: 'Mínimo 8 caracteres',
      isValid: false,
      icon: this.crossIcon
    },
    {
      id:2,
      description: 'Una letra minúscula',
      isValid: false,
      icon: this.crossIcon
    },
    {
      id:3,
      description: 'Una letra mayúscula',
      isValid: false,
      icon: this.crossIcon
    },
    {
      id:4,
      description: 'Un dígito',
      isValid: false,
      icon: this.crossIcon
    },
    {
      id:5,
      description: 'Un carácter especial',
      isValid: false,
      icon: this.crossIcon
    }
  ];

  constructor(public dialogRef: MatDialogRef<ModalFormLoginComponent>,
  ) { }

  ngOnInit(): void {
    this.initFormLogin()
    this.initiFormRegister()
  }

  initFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  initiFormRegister() {
    this.registerForm = this.formBuilder.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])],
      'password': ['', Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z\\d!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]{8,}$")])],
      'name': ['', [Validators.required]],
      'firstSurname': ['', [Validators.required]],
      'lastSurname': ['', [Validators.required]]
    });

    this.registerForm.get('password')!.valueChanges.subscribe((value:any) => {      
      this.validatePassword(value);
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
              this.snackbarService.openErrorSnackbar('Error del servidor', 'Cerrar')
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

  validatePassword(password: string) {
    console.log(password.length >= 8);
    
    this.infoUserPasswordValid[0].isValid = password.length >= 8;
    this.infoUserPasswordValid[1].isValid = /[a-z]/.test(password);
    this.infoUserPasswordValid[2].isValid = /[A-Z]/.test(password);
    this.infoUserPasswordValid[3].isValid = /\d/.test(password);
    this.infoUserPasswordValid[4].isValid = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password);

    this.infoUserPasswordValid.forEach(criteria => {
      console.log(criteria);
      
      criteria.icon = criteria.isValid ? this.checkIcon : this.crossIcon;
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
