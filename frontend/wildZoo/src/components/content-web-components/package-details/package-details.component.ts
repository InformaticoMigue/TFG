import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { catchError, forkJoin, map, of, switchMap, take, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Package, User } from '../../../assets/types';
import { PackageService } from '../../../service/zoo/package.service';
import { CarouselComponent } from '../../carousel/carousel.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCar, faCheck, faInfoCircle, faUserCheck, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StorageService } from '../../../service/storage/storage.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/zoo/user.service';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package-details',
  standalone: true,
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'],
  imports: [HeaderComponent, CommonModule, MatSnackBarModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CarouselComponent, FontAwesomeModule, FormsModule]
})
export class PackageDetailsComponent implements OnInit {
  public title!: string;
  private route: ActivatedRoute = inject(ActivatedRoute);;
  public package!: Package;
  private packageService: PackageService = inject(PackageService);
  public images: string[] = [];
  public car: IconDefinition = faCar;
  public users: IconDefinition = faUsers
  public information: IconDefinition = faInfoCircle;
  public userCheck: IconDefinition = faUserCheck
  public check: IconDefinition = faCheck;
  public mark: IconDefinition = faXmark
  private formBuilder: FormBuilder = inject(FormBuilder);
  public formBuyPackage: FormGroup = new FormGroup({});
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private user!: User;
  private router:Router = inject(Router);
  private snackbarService:CustomSnackbarService = inject(CustomSnackbarService)

  ngOnInit() {
    this.getActuallyUser();
    this.initAllSuscriptions();

  }

  public initAllSuscriptions() {
    return this.route.paramMap.pipe(
      switchMap(params => {
        const id = +params.get('id')!
        return forkJoin({
          package: this.getPackageById(id),
        });
      }),
      catchError(error => {
        console.error('Error getting package', error);
        this.router.navigate(['/']);
        return throwError(() => new Error('Redirected due to package not found')); 
      })
    ).subscribe((result: any) => {
      this.package = result.package.data;
      this.package.packageServices.sort((a, b) => {
        return (b.include === a.include) ? 0 : b.include ? 1 : -1;
      });
      this.title = this.package.name
      this.initForm();
      this.images = []
      this.setImages(3)
    });
  }

  public buyPackage() {
    if (!this.user) {
      this.snackbarService.openErrorSnackbar('Necesita estar logueado para comprar un paquete', 'Cerrar')
      return;
    }
    if (!this.user.creditCard) {
      this.snackbarService.openErrorSnackbar('Necesita tener una tarjeta de crédito para comprar', 'Cerrar')
      return;
    }
    
      this.packageService.buyPackage({
        date: this.formBuyPackage.get('date')!.value,
        user: {
          id: this.user.id
        },
        apackage: {
          id: this.package.id
        },
        guests: +this.formBuyPackage.get('guests')!.value,
      }).subscribe({
        next: (data) => {
          if (data) {
            this.snackbarService.openSucessSnackbar("Paquete comprado con éxito", "Cerrar")
          }else{
            this.snackbarService.openErrorSnackbar("Error desconocido", "Cerrar")
          }
        },
        error: (error) => {
          this.snackbarService.openErrorSnackbar("Error con el servidor", "Cerrar")
          console.error('Error at buy de package', error)
        }
        
      })
  }

  public getPackageById(packageId: number) {
    return this.packageService.find(packageId)
  }

  private setImages(numberImages: number) {
    for (let i = 1; i <= numberImages; i++) {
      this.images.push('../../../assets/img/zoo-images/package-details/' + this.package.name + '_' + i + '.jpg');
    }
  }

  private initForm() {
    this.formBuyPackage = this.formBuilder.group({
      'date': [new Date(), Validators.compose([Validators.required,this.dateValidator()])],
      'guests': ['', Validators.compose([Validators.required, Validators.min(this.package.packageType.min_size), Validators.max(this.package.packageType.max_size)])],
    })
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const currentDate = new Date();  
      currentDate.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
  
      return inputDate >= currentDate ? null : { invalidDate: true };
    };
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
}
