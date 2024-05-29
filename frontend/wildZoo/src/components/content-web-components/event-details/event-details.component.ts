import { AfterViewInit, Component, Inject, Input, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../service/zoo/event.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Animal, Event } from '../../../assets/types';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "../../carousel/carousel.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClock, faHourglassEnd, faHourglassStart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnimalsCardComponent } from '../animals-card/animals-card.component';


@Component({
    selector: 'app-event-details',
    standalone: true,
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss'],
    imports: [HeaderComponent, AnimalsCardComponent ,CommonModule, CarouselComponent, FontAwesomeModule ,ReactiveFormsModule, MatDatepickerModule, MatLabel,MatFormFieldModule]
})
export class EventDetailsComponent implements OnInit {
  public title: any;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private eventService: EventService = inject(EventService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  public event!: Event;
  public images:any[] = [];
  public formSuscribeEvent:FormGroup = new FormGroup({});
  public information: IconDefinition = faInfoCircle;
  public initialHour:IconDefinition = faHourglassStart
  public finishHour:IconDefinition = faHourglassEnd
  public dayEvent:IconDefinition = faClock


  ngOnInit() {
    this.initAllSuscriptions();
    this.initForms();
  }

  private initForms() {

  }

  private initAllSuscriptions() {
    return this.route.paramMap.pipe(
      switchMap((params) => {
        const id = +params.get('id')!;
        return forkJoin({
          event: this.getEvent(id)
        })
      })
    ).subscribe((responses) => {
      this.event = responses.event.data
      this.title = `${this.event.name}`
      this.setImages(3);
    })
  }

  private getEvent(id:number) {
    return this.eventService.find(id)
  }

  private setImages(numberImages: number) {
    for (let i = 1; i <= numberImages; i++) {
      this.images.push('../../../assets/img/zoo-images/event-details/' + this.event.name + '_' + i + '.jpg');
    }
  }

  public getBackground(animal:Animal){
    return '../../../assets/img/zoo-images/animals/' + animal.name + '.jpg';
  }
}
