import { Component, OnInit } from '@angular/core';
import { TitleSectionComponent } from '../title-section/title-section.component';
import { HeaderComponent } from '../content-web-components/header/header.component';
import { RouterLink } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faDollar, faPaw, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent,RouterLink,FontAwesomeModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public eventsIcon:IconDefinition = faCalendarAlt
  public adoptionsIcon:IconDefinition = faPaw
  public dollarIcon:IconDefinition = faDollar

  constructor() { }

  ngOnInit() {
  }

  
}
