import { AfterViewInit, Component, Inject, Input, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../service/zoo/event.service';
import { Observable, forkJoin } from 'rxjs';
import { Event } from '../../../assets/types';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-event-details',
  standalone: true,
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  imports: [HeaderComponent, CommonModule]
})
export class EventDetailsComponent implements OnInit {
  public title: any;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private eventService: EventService = inject(EventService);
  public event!: Event;

  ngOnInit() {
    this.initAllSuscriptions();
  }

  private initAllSuscriptions() {
    const observableArray: Observable<any>[] = [
      this.getEvent(),
    ]

    forkJoin(observableArray).subscribe((responses) => {
      this.event = responses[0].data
      this.title = `${this.event.name}`
    })
  }

  private getEvent() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    return this.eventService.find(id)
  }

}
