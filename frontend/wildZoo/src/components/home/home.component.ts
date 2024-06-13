import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ShotsComponent } from "../home-components/shots-home/shots.component";
import { Aclass, Animal, GalleryAnimal, GalleryAnimalsOptions, Specie } from '../../assets/types';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeaderHomeComponent } from "../home-components/header-home/header-home.component";
import { OurAnimalsComponent } from "../home-components/our-animals-home/our-animals.component";
import { ClassService } from '../../service/zoo/class.service';
import { SpecieService } from '../../service/zoo/specie.service';
import { Observable, forkJoin } from 'rxjs';
import { AnimalService } from '../../service/zoo/animal.service';
import { ServicesZooComponent } from '../home-components/services-zoo-home/services-zoo.component';
import { EventsHomeComponent } from "../home-components/events-home/events-home.component";
import { ActivatedRoute } from '@angular/router';
import { SponsorHomeComponent } from '../home-components/sponsor-home/sponsor-home.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ServicesZooComponent, ShotsComponent, SponsorHomeComponent,NavbarComponent, HeaderHomeComponent, OurAnimalsComponent, EventsHomeComponent]
})
export class HomeComponent implements OnInit {
    public optionsGallery!:GalleryAnimalsOptions;
    private AclassService:ClassService = inject(ClassService)
    private specieService:SpecieService = inject(SpecieService)
    private animalService:AnimalService = inject(AnimalService)
    private route:ActivatedRoute = inject(ActivatedRoute)
    public allSpecies!:Specie[]
    public allClasses!:Aclass[]
    public allAnimals!:Animal[]

    ngOnInit(): void {
       this.initOptionsGallery()
       this.initAllSuscriptions();
    }

    private initAllSuscriptions(){
        forkJoin({
            classes : this.getAllClasses(),
            species: this.getAllSpecies(),
            animals: this.getAllAnimals()
        }).subscribe(responses => {
            this.allClasses = responses.classes.data
            this.allSpecies = responses.species.data
            this.allAnimals = responses.animals.data
        })
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

    getAllSpecies() {
        return this.specieService.getAll()
    }

    getAllClasses() {
        return this.AclassService.getAll()
    }
    
    getAllAnimals() {
        return this.animalService.getAnimals()
    }
}
