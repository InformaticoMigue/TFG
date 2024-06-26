import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import AOS from "aos";
import { SpinnerComponent } from "../components/spinner/spinner.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, FooterComponent,FontAwesomeModule, NavbarComponent, SpinnerComponent]
})
export class AppComponent implements OnInit {
  title = 'wildZoo';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    AOS.init();
  }
}
