import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Aclass } from '../../../assets/types';

@Component({
  selector: 'app-our-animals-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './our-animals-card.component.html',
  styleUrl: './our-animals-card.component.scss'
})
export class OurAnimalsCardComponent implements OnInit  {
  @Input() Aclass!: any;
  ngOnInit(): void {
  }
}
