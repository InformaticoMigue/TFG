import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  standalone: true,
  imports: [NavbarComponent],
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
