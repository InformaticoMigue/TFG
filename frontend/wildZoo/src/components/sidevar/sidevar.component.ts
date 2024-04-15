import { Component, Input } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-sidevar',
  standalone: true,
  imports: [MatSidenavModule, FontAwesomeModule, FaIconComponent],
  templateUrl: './sidevar.component.html',
  styleUrl: './sidevar.component.scss'
})
export class SidevarComponent {
  @Input()
  public icon!:IconDefinition;
}
