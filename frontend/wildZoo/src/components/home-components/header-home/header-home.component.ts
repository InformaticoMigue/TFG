import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  standalone: true,
  imports: [NavbarComponent, MatButtonModule, RouterLink],
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit {
  constructor() { }
  
  ngOnInit() {
  }
  
}
