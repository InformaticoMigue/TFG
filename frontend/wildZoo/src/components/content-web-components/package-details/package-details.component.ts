import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { catchError, forkJoin, map, of, switchMap, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Package, User } from '../../../assets/types';
import { PackageService } from '../../../service/zoo/package.service';
import { CarouselComponent } from '../../carousel/carousel.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCar, faCheck, faInfoCircle, faUserCheck, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StorageService } from '../../../service/storage/storage.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/zoo/user.service';

@Component({
  selector: 'app-package-details',
  standalone: true,
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'],
  imports: [HeaderComponent, MatSnackBarModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CarouselComponent, FontAwesomeModule, FormsModule]
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

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getActuallyUser();
    this.initAllSuscriptions();
  }

  public initAllSuscriptions() {
    this.getIdParamUrl().pipe(
      switchMap(id => {
        return forkJoin({
          package: this.getPackageById(id),
        });
      }),
      catchError(error => {
        console.error('Error getting package', error);
        return of({ package: null });
      })
    ).subscribe((result: any) => {
      this.package = result.package.data;
      this.package.packageServices.sort((a, b) => {
        return (b.include === a.include) ? 0 : b.include ? 1 : -1;
      });
      this.title = this.package.name
      this.setImages(3)
      this.initForm();
    });
  }

  public buyPackage() {
    if (this.user == null) {
      this.openSnackBar('Necesita estar logueado para comprar un paquete', 5000, 'fill', 'error')
      return;
    }

    const princeFinal = +this.formBuyPackage.get('guests')!.value * this.package.packageType.price_per_person
    const canBuyPackage = this.user.creditCard.balance >= princeFinal


    if (canBuyPackage) {
      this.packageService.buyPackage({
        date: new Date(this.formBuyPackage.get('date')!.value),
        user: this.user,
        guests: +this.formBuyPackage.get('guests')!.value,
        apackage: this.package
      }).subscribe((data) => {
        if (data) {
          console.log(data);
        }
      })
    } else {
      this.openSnackBar(`No tiene suficiente saldo 💲💲 en ninguna de sus tarjetas de credito`, 5000, 'fill', 'error')
    }
  }

  openSnackBar(message: string,
    duration: number = 5000,
    appearance: 'fill' | 'outline' | 'soft' = 'fill',
    type: 'info' | 'success' | 'error' = 'info'): void {

    const config: MatSnackBarConfig = {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [`snackbar-type-${appearance}-${type}`]
    };
    this._snackBar.open(message, '', config);
  }

  public getPackageById(packageId: number) {
    return this.packageService.find(packageId)
  }

  private getIdParamUrl() {
    return this.route.paramMap.pipe(
      take(1),
      map((params: any) => +params.get('id')!)
    );
  }

  private setImages(numberImages: number) {
    for (let i = 1; i <= numberImages; i++) {
      this.images.push('../../../assets/img/zoo-images/package-details/' + this.package.name + '_' + i + '.jpg');
    }
  }

  private initForm() {
    this.formBuyPackage = this.formBuilder.group({
      'date': [new Date(), [Validators.required]],
      'guests': ['', [Validators.required, Validators.min(this.package.packageType.min_size), Validators.max(this.package.packageType.max_size)]],
    })
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