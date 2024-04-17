import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  standalone: true,
  imports: [NavbarComponent, MatButtonModule],
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
