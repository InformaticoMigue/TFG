import { Component, OnInit } from '@angular/core';
import { TitleSectionComponent } from "../../title-section/title-section.component";

@Component({
    selector: 'app-events-home',
    standalone: true,
    templateUrl: './events-home.component.html',
    styleUrls: ['./events-home.component.scss'],
    imports: [TitleSectionComponent]
})
export class EventsHomeComponent implements OnInit {

  ngOnInit() {
  }

}
