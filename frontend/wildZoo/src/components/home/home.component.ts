import { Component, OnInit } from '@angular/core';
import { ShotsComponent } from "../shots/shots.component";
import { GalleryAnimal, GalleryAnimalsOptions } from '../../assets/types';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeaderHomeComponent } from "../header-home/header-home.component";
import { OurAnimalsComponent } from "../our-animals/our-animals.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ShotsComponent, NavbarComponent, HeaderHomeComponent, OurAnimalsComponent]
})
export class HomeComponent implements OnInit {
    public optionsGallery!:GalleryAnimalsOptions;

    ngOnInit(): void {
        this.initOptionsGallery()
    }

    initOptionsGallery(): void {
        this.optionsGallery = {
            hoverAnimal: true,
            increaseAnimal: true,
            numberCols: 4,
            rowHeight: '',
            animals: this.getGalleryAnimals()  
        };
    }

    private getGalleryAnimals():GalleryAnimal[]{
        return [
            {class: 'Mamífero', cols: 1, rows:1, name: 'Jirafas', image: '../assets/img/gallery-home/jirafa-shot.jpg'},
            {class: 'Mamífero', cols: 2, rows:2, name: 'Leones', image: '../assets/img/gallery-home/leon-shot.jpg'},
            {class: 'Aves', cols: 1, rows:2, name: 'Loros', image: '../assets/img/gallery-home/ave-shot.jpg'},
            {class: 'Reptiles', cols: 1, rows:1, name: 'Lagartos', image: '../assets/img/gallery-home/lagarto-shot.jpg'},
            {class: 'Peces', cols: 2, rows:1, name: 'Tiburones', image:'../assets/img/gallery-home/tiburon-shot.jpg'},
            {class: 'Mamíferos', cols: 2, rows:1, name: 'Elefantes', image:'../assets/img/gallery-home/elefante-shot.jpg'}
        ]
    }

}
