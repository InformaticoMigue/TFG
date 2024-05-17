import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AnimalService } from '../../../service/zoo/animal.service';
import { Observable, forkJoin } from 'rxjs';
import { ClassService } from '../../../service/zoo/class.service';
import { Aclass, Animal } from '../../../assets/types';
import { AnimalsCardComponent } from '../animals-card/animals-card.component';
import { filterAnimalOpacity } from '../../../constants/animations';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [HeaderComponent,AnimalsCardComponent,CommonModule, RouterLink],
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
  animations:[filterAnimalOpacity]
})
export class AnimalsComponent implements OnInit {
  private animalService: AnimalService = inject(AnimalService);
  private classService: ClassService = inject(ClassService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  public animals: Animal[] = [];
  public allAnimals: Animal[] = [];
  public filters: any[] = [];
  public activeFilterId?: number;
  public currentPage: number = 1;
  public itemsPerPage: number = 12;
  public pagedAnimals: Animal[] = [];
  @ViewChild('filtersArticle') filtersArticle!: ElementRef;

  ngOnInit(): void {
    this.initAllSubscriptions();
  }

  private initAllSubscriptions(): void {
    const observableArray: Observable<any>[] = [
      this.getAllAnimals(),
      this.getAllClasses(),
    ];

    forkJoin(observableArray).subscribe((responses) => {
      this.animals = responses[0].data;
      this.allAnimals = responses[0].data;
      this.filters = responses[1].data.map((aclass: Aclass) => ({
        id: aclass.id,
        name: aclass.name,
        filterFunc: () => this.filterAnimalsByClass(aclass.id)
      }));
      this.filters.unshift({ id: 0, name: "Todos los animales", filterFunc: () => this.filterAnimalsByClass(0) });
      this.getParamIdClass();
      this.updatePagedAnimals();
    });
  }

  filterAnimalsByClass(id: number): void {
    if (id !== 0) {
      this.animals = this.allAnimals.filter((animal: Animal) => animal.aclass.id === id);
    } else {
      this.animals = [...this.allAnimals];
    }
    this.updatePagedAnimals();
  }

  setActiveFilter(filter: any): void {
    this.activeFilterId = filter.id;
    filter.filterFunc();
  }

  private getAllAnimals(): Observable<any> {
    return this.animalService.getAnimals();
  }

  scrollToTop(): void {
    this.filtersArticle.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  private getAllClasses(): Observable<any> {
    return this.classService.getAll();
  }

  private getParamIdClass(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.currentPage = 1;
      this.updatePagedAnimals();
      this.setActiveFilter({ id: id, filterFunc: () => this.filterAnimalsByClass(id) });
    });
  }

  updatePagedAnimals(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedAnimals = this.animals.slice(startIndex, endIndex);
  }  

  setPage(page: number): void {
    this.currentPage = page;
    this.updatePagedAnimals(); 
    this.scrollToTop()
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }
  
  get totalPages(): number {
    return Math.ceil(this.animals.length / this.itemsPerPage);
  }
  
}
