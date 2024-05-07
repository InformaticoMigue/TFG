import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import AOS from "aos";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent],
})
export class AppComponent implements OnInit {
  title = 'wildZoo';
  ngOnInit(): void {
    AOS.init();
  }
}
