import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [NavbarComponent,CommonModule]
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() abstract: boolean = true;

  ngOnInit() {
  }

}
