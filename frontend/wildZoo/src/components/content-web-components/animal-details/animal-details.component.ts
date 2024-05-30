import { Component, inject, OnInit } from '@angular/core';
import { SponsorAnimal, Animal, User } from '../../../assets/types';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, forkJoin, map, of, switchMap, throwError } from 'rxjs';
import { AnimalService } from '../../../service/zoo/animal.service';
import { AdoptionService } from '../../../service/zoo/adoption.service';
import { CommonModule } from '@angular/common';
import { faAddressBook, faAddressCard, faCakeCandles, faCalendarCheck, faGlobe, faHome, faPaw, faUtensils, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SpecieService } from '../../../service/zoo/specie.service';
import { AnimalsCardComponent } from '../animals-card/animals-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselComponent } from '../../carousel/carousel.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalAdoptionComponent } from '../../home-components/modals/modal-adoption/modal-adoption.component';
import { TitleSectionComponent } from '../../title-section/title-section.component';
import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/zoo/user.service';

@Component({
  selector: 'app-animal-details',
  standalone: true,
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
  imports: [HeaderComponent, TitleSectionComponent ,CommonModule, CarouselComponent, AnimalsCardComponent,FontAwesomeModule]
})
export class AnimalDetailsComponent implements OnInit {
  public animal: any = {};
  public similarAnimal!: any;
  public title!: string;
  private animalService: AnimalService = inject(AnimalService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private adoptionService: AdoptionService = inject(AdoptionService);
  private specieService: SpecieService = inject(SpecieService);
  private router: Router = inject(Router);
  private matDialog: MatDialog = inject(MatDialog);
  private authService: AuthService = inject(AuthService);
  private user!: User;
  private userService: UserService = inject(UserService);
  public utensilsIcon: IconDefinition = faUtensils;
  public weightIcon: IconDefinition = faWeightHanging;
  public worldIcon: IconDefinition = faGlobe;
  public classIcon: IconDefinition = faAddressBook;
  public adoptionIcon: IconDefinition = faPaw;

  ngOnInit(): void {
    this.getActuallyUser().pipe(
      switchMap(() => this.initAllSubscriptions())
    ).subscribe();
  }
  
  initAllSubscriptions(): Observable<any> {
    return this.route.paramMap.pipe(
      switchMap(params => {
        const id = +params.get('id')!;
        return forkJoin({
          animal: this.getAnimalById(id).pipe(
            catchError(error => {
              console.error('Error getting animal', error);
              this.router.navigate(['/']);
              return throwError(() => new Error('Redirected due to animal not found'));
            })
          ),
          isAvailable: this.isAvailableToAdoption(id).pipe(
            catchError(error => {
              console.error('Failed to check adoption availability', error);
              return of(false);
            })
          ),
        }).pipe(
          switchMap(result => {
            const specieId = result.animal.data.specie.id;
            return forkJoin({
              animal: of(result.animal),
              isAvailable: of(result.isAvailable),
              specieById: this.getSpecieById(specieId).pipe(
                catchError(error => {
                  console.error('Failed to get specie by id', error);
                  return of(null);
                })
              )
            });
          }),
          catchError(error => {
            console.error('Error handling in subscriptions', error);
            return of({ animal: null, isAvailable: false, specieById: null });
          })
        );
      })
    ).pipe(
      map((result: any) => {
        if (result.animal) {
          this.animal = result.animal.data;
          this.title = this.animal.name;
          this.animal.isAvailableForAdoption = result.isAvailable;
          const animalsBySpecie = result.specieById.data.animals.filter((animal: Animal) => animal.id !== this.animal.id);
          this.similarAnimal = animalsBySpecie[Math.floor(Math.random() * animalsBySpecie.length)];
          console.log(this.animal);
          
        } else {
          console.log('Result handling for non-existing animal');
        }
      }),
      catchError(error => {
        console.error('Final error handling', error);
        return of(null);
      })
    );
  }

  openModalAdoption(sponsorAnimal: SponsorAnimal) {  
    this.matDialog.open(ModalAdoptionComponent, {
      data: {
        sponsorAnimal,
        user: this.user        
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.animal.isAvailableForAdoption.adoption = res;
      }      
    });
  }

  private isAvailableToAdoption(idAnimal: number) {
    return this.adoptionService.isAnimalAdoption(idAnimal);
  }

  private getAnimalById(id: number) {
    return this.animalService.find(id);
  }

  private getSpecieById(id: number) {
    return this.specieService.find(id);
  }
  
  getActuallyUser(): Observable<User | null> {
    return this.authService.currentUser$.pipe(
      switchMap(tokenDecoded => {
        if (tokenDecoded && tokenDecoded.id) {
          return this.userService.find(+tokenDecoded.id).pipe(
            map(fullUser => {
              this.user = fullUser.data;
              return this.user;
            })
          );
        } else {
          return throwError(() => new Error('User not authenticated'));
        }
      }),
      catchError(error => {
        console.error('Failed to get user', error);
        return of(null);
      })
    );
  }

  getFormattedWeight(weight: number): string {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(2)} kg`;
    } else {
      return `${weight} g`;
    }
  }

  getBackground() {
    return '../../../assets/img/zoo-images/animals/' + this.animal.name + '.jpg';
  }
}