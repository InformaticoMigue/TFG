import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SponsorService } from '../../../service/zoo/sponsor.service';
import { catchError, forkJoin, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';
import { Sponsor, SponsorAnimal, User } from '../../../assets/types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { ModalAdoptionComponent } from '../../home-components/modals/modal-adoption/modal-adoption.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/zoo/user.service';
import { TitleSectionComponent } from '../../title-section/title-section.component';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [HeaderComponent, FontAwesomeModule,TitleSectionComponent],
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {
  public title: string = 'Apadrinamientos'
  private router: Router = inject(Router);
  private sponsorService: SponsorService = inject(SponsorService)
  private snackbarService: CustomSnackbarService = inject(CustomSnackbarService)
  public allSponsorsAnimals: SponsorAnimal[] = [];
  public adoptionIcon: IconDefinition = faPaw
  private matDialog: MatDialog = inject(MatDialog);
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  public user!:User;

  ngOnInit() {
    this.getActuallyUser();
    this.initAllSuscriptions();
  }

  initAllSuscriptions() {
    forkJoin({
      availables: this.getAllAvailableSponsoredAnimals().pipe(
        catchError(() => {
          this.router.navigate(['/'])
          this.snackbarService.openErrorSnackbar("Error con el servidor", "Cerrar")
          return throwError(() => "Server error")
        }))
    }).subscribe(res => {
      this.allSponsorsAnimals = res.availables.data
      
    })
  }

  public openModalAdoption(sponsorAnimal: SponsorAnimal) {
    this.matDialog.open(ModalAdoptionComponent, {
      data: {
        sponsorAnimal,
        user: this.user
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        const foundSponsorAnimal = this.allSponsorsAnimals.find(sa => sa.id == res.sponsorAnimal.id)
        console.log(foundSponsorAnimal);
        
        foundSponsorAnimal!.sponsor = res
      }
    });
  }

  getActuallyUser() {
    this.authService.currentUser$.subscribe(tokenDecoded => {
      if (tokenDecoded && tokenDecoded.id) {
        this.userService.find(+tokenDecoded.id).subscribe({
          next: (fullUser) => {
            this.user = fullUser.data;
          },
        });
      }
    })
  }

  private getAllAvailableSponsoredAnimals() {
    return this.sponsorService.getAllAvailableAnimals()
  }
}
