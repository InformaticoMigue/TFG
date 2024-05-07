import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
    selector: 'app-events',
    standalone: true,
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    imports: [HeaderComponent, NavbarComponent]
})
export class EventsComponent implements OnInit {

  public title = 'Eventos';
  
  ngOnInit() {
  }

}
