import { Component, Input, inject } from '@angular/core';
import { CountUpOptions } from 'countup.js';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-count-up',
  standalone: true,
  imports: [CountUpModule],
  templateUrl: './count-up.component.html',
  styleUrl: './count-up.component.css'
})
export class CountUpComponent {
  @Input()
  public number: number = 0;
  @Input()
  public options:CountUpOptions = {};
}
