import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '../../../assets/types';

@Component({
  selector: 'app-event-zoo-card-home',
  standalone: true,
  imports: [],
  templateUrl: './event-zoo-card-home.component.html',
  styleUrl: './event-zoo-card-home.component.scss'
})
export class EventZooCardHomeComponent implements OnInit{
  @Input() event!:any;
  @Output() private handleClickButton:EventEmitter<Event> = new EventEmitter();

  ngOnInit(): void {
  }
    
  handleClickEvent() {
    this.handleClickButton.emit(this.event)
  }

  formatTime(hour: number): string {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12} ${ampm}`;
  }
}
