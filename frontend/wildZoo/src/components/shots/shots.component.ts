import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { GalleryAnimal, GalleryAnimalsOptions } from '../../assets/types';
import { TitleSectionComponent } from "../title-section/title-section.component";

export type Tile = {
  id: number;
  urlImage: string;
  cols: number;
  rows: number;
}

@Component({
    selector: 'app-shots',
    standalone: true,
    templateUrl: './shots.component.html',
    styleUrl: './shots.component.scss',
    imports: [MatGridListModule, CommonModule, TitleSectionComponent]
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
