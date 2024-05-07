import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [NavbarComponent]
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;

  ngOnInit() {
  }

}
