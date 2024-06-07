import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TicketService } from '../../../service/zoo/ticket.service';
import { Observable, catchError, forkJoin, map, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../service/auth/auth.service';
import { User } from '../../../assets/types';
import { UserService } from '../../../service/zoo/user.service';

@Component({
  standalone: true,
  selector: 'app-ticket',
  imports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FontAwesomeModule
  ],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
})
export class TicketComponent implements OnInit {
  private ticketService: TicketService = inject(TicketService);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private snackbarService: CustomSnackbarService = inject(CustomSnackbarService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private user!:User;
  private userService: UserService = inject(UserService);
  public typesTickets: any[] = [];
  public cartShopping: IconDefinition = faCartShopping;
  public ticketForm!: FormGroup;
  @ViewChild('stepper') private stepper!: MatStepper; 

  constructor(){
    this.initForm();
  }

  ngOnInit() {
    this.getActuallyUser();
    this.initAllSubscriptions();
  }

  private initForm(){
    this.ticketForm = this.formBuilder.group({
      date: [new Date(), Validators.compose([Validators.required, this.dateValidator()])],
      tickets: this.formBuilder.array([])
    });
  }

  private initTicketsForm() {
    const ticketControls = this.typesTickets.map(ticketType => this.formBuilder.group({
      id: [ticketType.id],
      name: [ticketType.name],
      price: [ticketType.price],
      description: [ticketType.description],
      quantity: [0, Validators.min(0)]
    }));
    this.ticketForm.setControl('tickets', this.formBuilder.array(ticketControls, { validators: this.ticketsQuantityValidator() }));
  }

  get ticketsArray() {
    return this.ticketForm.get('tickets') as FormArray;
  }

  private getTotalQuantity(){
    return this.ticketsArray.controls.reduce((sum, control) => sum + control.get('quantity')!.value, 0);
  }

  ticketsQuantityValidator() {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const tickets = formGroup as FormArray;
      if (!tickets || tickets.length === 0) return { quantityInvalid: true };
      const totalQuantity = this.getTotalQuantity();
      return totalQuantity > 0 ? null : { quantityInvalid: true };
    };
  }

  buyTickets() {
    if (!this.user) {
      this.snackbarService.openErrorSnackbar('Necesita estar logueado para comprar entradas', 'Cerrar')
      return;
    }
    if (!this.user.creditCard) {
      this.snackbarService.openErrorSnackbar('Necesita tener una tarjeta de crédito para comprar', 'Cerrar')
      return;
    }

    for (const controlTicket of this.ticketsArray.controls) {
      if (controlTicket.value.quantity > 0) {
        for (let index = 0; index < controlTicket.value.quantity; index++) {
          const realTypeTicket = {
            id: controlTicket.value.id,
            price: controlTicket.value.price,
            description: controlTicket.value.description,
            name: controlTicket.value.name
          };
          const date = new Date(this.ticketForm.get("date")?.value)  
          date.setDate(date.getDate()+1);
                  
          const objectToRequest = {
            id: null,
            date: date,
            user: {
              id: this.user.id
            },
            typeTicket: realTypeTicket
          }
          this.ticketService.buyTicket(objectToRequest).pipe(
            catchError(err => {
              this.snackbarService.openErrorSnackbar("Error con el servidor", "Cerrar")
              return of(null);
            })
          ).subscribe((response) => {
            if(response){
              this.snackbarService.openSucessSnackbar(this.getTotalQuantity() > 1 ? "Entradas comprado con éxito" : "Entrada comprado con éxito", "Cerrar")            
            }
          })          
        }
      }   
    }
    this.stepper.reset();
    this.initForm();
    this.initTicketsForm();
  }

  dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
      return inputDate >= currentDate ? null : { invalidDate: true };
    };
  }

  initAllSubscriptions() {
    forkJoin({
      typesTickets: this.ticketService.getAllTypesTicket().pipe(
        catchError((err) => {
          this.router.navigate(['/']);
          this.snackbarService.openErrorSnackbar("Error del servidor", "Cerrar");
          return throwError(() => new Error('Redirected due to error to get all types of tickets'));
        })
      ),
    }).subscribe({
      next: (res) => {
        console.log(res); 
        if (res.typesTickets && res.typesTickets.data ) {
          this.typesTickets = res.typesTickets.data;
          this.initTicketsForm();
        }
      },
      error: (err) => {
        console.error('Error en las suscripciones', err);
      }
    });
  }
  
  getActuallyUser() {
    this.authService.currentUser$.subscribe(tokenDecoded => {
      if (tokenDecoded && tokenDecoded.id) {
        this.userService.find(+tokenDecoded.id).subscribe({
          next: (fullUser) => {
            this.user = fullUser.data;
          },
        });
      }
    })
  }
  getQueryMaxNormal(){
    return window.innerWidth <= 768
  }
}
