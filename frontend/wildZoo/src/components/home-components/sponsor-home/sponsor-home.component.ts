import { Component, OnInit } from '@angular/core';
import { TitleSectionComponent } from '../../title-section/title-section.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sponsor-home',
  standalone: true,
  imports:[TitleSectionComponent,RouterLink],
  templateUrl: './sponsor-home.component.html',
  styleUrls: ['./sponsor-home.component.scss']
})
export class SponsorHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
