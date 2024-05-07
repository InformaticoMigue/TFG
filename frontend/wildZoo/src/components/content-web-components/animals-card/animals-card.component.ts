import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../../../assets/types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animals-card',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './animals-card.component.html',
  styleUrls: ['./animals-card.component.scss']
})
export class AnimalsCardComponent implements OnInit {

  @Input() animal!:Animal;
  

  ngOnInit() {
  }

  getBackground(){
    return '../../../assets/img/zoo-images/animals/' + this.animal.name + '.jpg';
  }
}
