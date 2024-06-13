import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { User } from '../../../assets/types';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarCheck, faPaw } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../service/zoo/user.service';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';
import { AuthService } from '../../../service/auth/auth.service';
import { switchMap, of } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  imports: [MatExpansionModule, MatError, CommonModule, FontAwesomeModule, MatAccordion, ReactiveFormsModule, MatFormField, MatLabel, MatInput, CommonModule],
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder)
  private userService: UserService = inject(UserService);
  private snackbarService: CustomSnackbarService = inject(CustomSnackbarService);
  private authService: AuthService = inject(AuthService);
  private location: Location = inject(Location);
  public eventSalesItems: any;
  public step = 0;
  public formDetailsUser: FormGroup = new FormGroup({});
  @Input() public user!: User;
  public sponsorItems: any;

  ngOnInit() {    
    this.setAccordionItems();
    this.initForm();
  }

  private initForm(){
    this.formDetailsUser = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      firstSurname: [this.user.firstSurname, Validators.required],
      lastSurname: [this.user.lastSurname, Validators.required],
      username: [this.user.username, Validators.compose([Validators.required, Validators.minLength(3)])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])],
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  updateUrlWithToken(newToken: string) {
    const currentPath = this.location.path();
    const basePath = currentPath.split('/').slice(0, -1).join('/');
    const newPath = `${basePath}/${newToken}`;
    this.location.replaceState(newPath);
  }

  onSubmit() {
    const previousUsername = this.user.username;
    const newUsername = this.formDetailsUser.get("username")?.value;

    this.userService.checkUsernameAvailability(newUsername).pipe(
      switchMap(availability => {
        if ((!availability.data) || (newUsername === previousUsername)) {
          const objectRequest = {
            id: this.user.id,
            name: this.formDetailsUser.get('name')?.value,
            firstSurname: this.formDetailsUser.get('firstSurname')?.value,
            lastSurname: this.formDetailsUser.get('lastSurname')?.value,
            email: this.formDetailsUser.get('email')?.value,
            password: this.user.password,
            username: newUsername
          };
          return this.userService.updateUser(objectRequest);
        } else {
          return of(null);
        }
      }),
      switchMap(updateResponse => {
        if (updateResponse) {
          return this.authService.login(updateResponse.data.username, updateResponse.data.password);
        }
        return of(null);
      })
    ).subscribe({
      next: (token) => {
        if (token) {
          this.updateUrlWithToken(token)
          this.snackbarService.openSucessSnackbar('Usuario actualizado con éxito', 'Cerrar');
        } else {
          this.snackbarService.openErrorSnackbar('Error, ese nombre de usuario ya existe', 'Cerrar');
        }
      },
      error: (error) => {
        this.snackbarService.openErrorSnackbar('Error del servidor', 'Cerrar');
        console.error("Error in process", error);
      }
    });
  }

  setAccordionItems() {
    this.sponsorItems = {
      icon: faPaw,
      title: "Apadrinamientos",
      sponsors: this.user.sponsors
    }

    this.eventSalesItems = {
      icon: faCalendarCheck,
      title: "Registro de eventos",
      eventsales: this.user.eventSales
    }
  }

  formatTime(hour: number): string {
    const ampm = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12; // Convert 0 hour to 12 for 12-hour format
    return `${hour12} ${ampm}`;
  }

}
