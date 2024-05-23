import { Component, OnInit, inject } from '@angular/core';
import { TitleSectionComponent } from "../../title-section/title-section.component";
import { Observable, forkJoin } from 'rxjs';
import { Event } from '../../../assets/types';
import { EventService } from '../../../service/zoo/event.service';
import { EventZooCardHomeComponent } from "../event-zoo-card-home/event-zoo-card-home.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-events-home',
    standalone: true,
    templateUrl: './events-home.component.html',
    styleUrls: ['./events-home.component.scss'],
    imports: [RouterLink, TitleSectionComponent, EventZooCardHomeComponent]
})
export class EventsHomeComponent implements OnInit {
  public eventsToShow:Event[] = [];
  public eventDetails!:any
  private eventService:EventService = inject(EventService);

  ngOnInit() {
    this.initAllSuscriptions();
  }

  private initAllSuscriptions(): void {
    const observableArray:Observable<any>[] = [
      this.getAllEvents()
    ]

    forkJoin(observableArray).subscribe((response) => {
      this.eventsToShow = response[0].data.filter((event:Event,index:number) => index <= 2)
      this.eventsToShow.forEach((event:Event) => {
        this.formatEventContent(event)      
      })
      this.eventDetails = this.eventsToShow[0]
    })
  }

  private formatEventContent(event:any){
    const indexFirstPoint = event.description.indexOf('.')
    const newString = event.description.substring(0,indexFirstPoint)
    event.descriptionAccorted = newString
    this.formatDate(event)

  }

  private formatDate(event:any){
    const date = new Date(event.date);
    const namesMonth = {
      1: "Enero",
      2: "Febrero",
      3: "Marzo",
      4: "Abril",
      5: "Mayo",
      6: "Junio",
      7: "Julio",
      8: "Agosto",
      9: "Septiembre",
      10: "Octubre",
      11: "Noviembre",
      12: "Diciembre"
    }

    const monthNumber = date.getMonth() + 1;
    const selectedMonthName = namesMonth[monthNumber as keyof typeof namesMonth];
    
    event.dateInfo = {
      dayMonth: date.getDate(),
      nameMonth: selectedMonthName
    }
  }


  formatTime(hour: number): string {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12} ${ampm}`;
  }

  private getAllEvents(){
    return this.eventService.getAll();
  }

  showNewEvent($event:Event){
    console.log($event);
    this.eventDetails = $event;
  }

}
