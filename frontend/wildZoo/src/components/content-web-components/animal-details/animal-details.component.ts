import { Component, inject, OnInit } from '@angular/core';
import { Animal } from '../../../assets/types';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of, switchMap, take } from 'rxjs';
import { AnimalService } from '../../../service/zoo/animal.service';
import { AdoptionService } from '../../../service/zoo/adoption.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-details',
  standalone: true,
  templateUrl: './animal-details.component.html',
  styleUrl: './animal-details.component.scss',
  imports: [HeaderComponent,CommonModule]
})
export class AnimalDetailsComponent implements OnInit {
  public animal!: any;
  private animalService: AnimalService = inject(AnimalService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private adoptionService: AdoptionService = inject(AdoptionService)

  ngOnInit(): void {
    this.initAllSuscriptions();
  }

  initAllSuscriptions() {
    this.getIdParamUrl().pipe(
      switchMap(id => {
        return forkJoin({
          animal: this.getAnimalById(id),
          isAvailable: this.isAvailableToAdoption(id).pipe(
            catchError(error => {
              console.error('Failed to check adoption availability', error);
              return of(false);
            })
          )
        });
      }),
      catchError(error => {
        console.error('Error getting animal', error);
        return of({ animal: null, isAvailable: false });
      })
    ).subscribe((result: any) => {
      this.animal = result.animal.data;
      this.animal.isAvailableForAdoption = result.isAvailable;
      console.log(this.animal);
      
    });
  }
 
  private getIdParamUrl() {
    return this.route.paramMap.pipe(
      take(1),
      map(params => +params.get('id')!)
    );
  }

  private isAvailableToAdoption(idAnimal: number) {
    return this.adoptionService.isAnimalAdoption(idAnimal);
  }

  private getAnimalById(id: number) {
    return this.animalService.find(id);
  }
}
