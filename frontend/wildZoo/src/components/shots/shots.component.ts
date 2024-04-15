import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { GalleryAnimal, GalleryAnimalsOptions } from '../../assets/types';

export type Tile = {
  id: number;
  urlImage: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-shots',
  standalone: true,
  imports: [MatGridListModule,CommonModule],
  templateUrl: './shots.component.html',
  styleUrl: './shots.component.scss'
})
export class ShotsComponent implements OnInit {
  private id = 0;
  @Input()
  public options!: GalleryAnimalsOptions;
  public responsive: boolean = false;

  ngOnInit(): void {
      this.formatAnimals();
      this.onResize();
  }

  private formatAnimals() {
    this.options.animals.forEach((element:GalleryAnimal) => {
      element.id = this.id
    });
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth <= 768) {
      this.responsive = true;
    } else {
      this.responsive = false;
    }    
  }
  
}
