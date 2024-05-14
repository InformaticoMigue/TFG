import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() images: string[] = [];
  @Input() interval: number = 3000;
  currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel() {
    setInterval(() => {
      this.next();
    }, this.interval);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  selectIndex(index: number) {
    this.currentIndex = index;
  }
}
