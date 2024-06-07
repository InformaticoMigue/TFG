import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-top',
  standalone: true,
  imports: [FontAwesomeModule,RouterLink],
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {

  public ubicationIcon:IconDefinition = faLocationDot
  public phoneIcon:IconDefinition = faPhone

  ngOnInit() {
  }

}
