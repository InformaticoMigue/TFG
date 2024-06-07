import { AfterViewInit, Component, Inject, Input, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../service/zoo/event.service';
import { Observable, catchError, forkJoin, map, switchMap, throwError } from 'rxjs';
import { Animal, Event, User } from '../../../assets/types';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "../../carousel/carousel.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClock, faHourglassEnd, faHourglassStart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnimalsCardComponent } from '../animals-card/animals-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../service/zoo/user.service';
import { AuthService } from '../../../service/auth/auth.service';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';


@Component({
  selector: 'app-event-details',
  standalone: true,
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  imports: [HeaderComponent, CommonModule, AnimalsCardComponent, MatSnackBarModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CarouselComponent, FontAwesomeModule, FormsModule]
})
export class EventDetailsComponent implements OnInit {
  public title: any;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private eventService: EventService = inject(EventService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private snackbarService: CustomSnackbarService = inject(CustomSnackbarService);
  private user!: User;
  public event!: Event;
  public images: any[] = [];
  public formSuscribeEvent: FormGroup = new FormGroup({});
  public information: IconDefinition = faInfoCircle;
  public initialHour: IconDefinition = faHourglassStart
  public finishHour: IconDefinition = faHourglassEnd
  public dayEvent: IconDefinition = faClock
  public dateToday!: Date;
  public dateEvent!: Date;

  ngOnInit() {
    this.initAllSuscriptions();
  }


  private initAllSuscriptions() {
    return this.route.paramMap.pipe(
      switchMap((params) => {
        const id = +params.get('id')!;
        return forkJoin({
          event: this.getEvent(id).pipe(
            catchError((err) => {
              this.router.navigate(['/']);
              return throwError(() => err.message)
            }
            )
          )
        })
      })
    ).subscribe((responses) => {
      this.event = responses.event.data
      this.dateEvent = new Date(responses.event.data.date);
      this.dateToday = new Date();
      this.title = `${this.event.name}`
      this.images = []
      this.setImages(3)
      this.getActuallyUser();     
    })
  }

  public verifyInscription() {
    const fechaActual = new Date();
    const diferencia = new Date(this.event.date).getTime() - fechaActual.getTime();
    const diasDiferencia = diferencia / (1000 * 3600 * 24);
    return diasDiferencia >= 7 ? false : true
  }

  public registerToEvent() {
    
    if (!this.user) {
      this.snackbarService.openErrorSnackbar("Necesita estar logueado", "Cerrar")
      return;
    }

    const ticketDayEvent = this.user.tickets.find(t => t.date == this.event.date)

    if (!this.user.tickets || !ticketDayEvent) {
      this.snackbarService.openErrorSnackbar("Necesita comprar un ticket con la fecha del evento", "Cerrar")
      return;
    }
    
    if (this.user.eventSales.find(evs => evs.event.id == this.event.id)) {
      this.snackbarService.openErrorSnackbar("Ya se ha inscrito a este evento", "Cerrar")
      return;
    }

    const objectRequest = {
      event: {
        id: this.event.id
      },
      user: {
        id: this.user.id
      },
      registrationDate: new Date()
    }
    this.eventService.register(objectRequest).subscribe({
      next: (event) => {
        this.user.eventSales.push(event.data);
        this.snackbarService.openSucessSnackbar(`Se ha inscrito correctamente al evento ${this.event.name}`, "Cerrar")
      },
      error: () => {
        this.snackbarService.openErrorSnackbar("Error del servidor", "Cerrar")
      }
    })
  }

  private getEvent(id: number) {
    return this.eventService.find(id)
  }

  private setImages(numberImages: number) {
    for (let i = 1; i <= numberImages; i++) {
      this.images.push('../../../assets/img/zoo-images/event-details/' + this.event.name + '_' + i + '.jpg');
    }
  }


  formatTime(hour: number): string {
    const ampm = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12; // Convert 0 hour to 12 for 12-hour format
    return `${hour12} ${ampm}`;
  }

  public getBackground(animal: Animal) {
    return '../../../assets/img/zoo-images/animals/' + animal.name + '.jpg';
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


}
