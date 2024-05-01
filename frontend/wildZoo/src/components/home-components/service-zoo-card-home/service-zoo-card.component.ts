import { Component, Input } from '@angular/core';
import { Service } from '../../../assets/types';

@Component({
  selector: 'app-service-zoo-card',
  standalone: true,
  imports: [],
  templateUrl: './service-zoo-card.component.html',
  styleUrl: './service-zoo-card.component.scss'
})
export class ServiceZooCardComponent {
  @Input() service!:Service;
}
