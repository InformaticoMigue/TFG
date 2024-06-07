import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SponsorService } from '../../../../service/zoo/sponsor.service';
import { CustomSnackbarService } from '../../../../service/snackbar/custom-snackbar.service';
import { catchError, of } from 'rxjs';
import { User } from '../../../../assets/types';

@Component({
  selector: 'app-modal-adoption',
  standalone: true,
  imports: [MatFormField,MatInput,MatLabel,ReactiveFormsModule],
  templateUrl: './modal-adoption.component.html',
  styleUrls: ['./modal-adoption.component.scss']
})
export class ModalAdoptionComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private adoptionService:SponsorService = inject(SponsorService);
  private snackbarService:CustomSnackbarService = inject(CustomSnackbarService);
  public sponsorAnimal:any;
  public formAdoption:FormGroup = new FormGroup({});
  private user!:User;

  constructor(public dialogRef: MatDialogRef<ModalAdoptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {     
    this.sponsorAnimal = data.sponsorAnimal;
    this.user = data.user;        
  }

  ngOnInit() {
    this.formAdoption = this.formBuilder.group({
      price: [this.sponsorAnimal.price, [Validators.required]]
    })
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  adoption(){
    if (!this.user) {
      this.snackbarService.openErrorSnackbar("Necesita estar logueado para apadrinar a un animal", "Cerrar");
      return;
    }
    if (!this.user.creditCard) {
      this.snackbarService.openErrorSnackbar("Necesita tener una tarjeta de crédito para apadrinar a un animal", "Cerrar");
      return;
    }

    const objectToRequest = {
      date: new Date(),
      sponsorAnimal: {
        id: this.sponsorAnimal.id
      },
      animal: {
        id: this.sponsorAnimal.animal.id
      },
      user: {
        id: this.user.id
      }
    }

    this.adoptionService.savedAdoption(objectToRequest).pipe(
      catchError(err => {
        console.log(err);
        return of(null);
      })
    ).subscribe({
      next: data => {
        if (data) {
          this.snackbarService.openSucessSnackbar(this.sponsorAnimal.animal.name + " Apadrinado con éxtio", "Cerrar")
          const newResponse = {
            date: data.data.date,
            id: data.data.id,
            user: this.user,
            sponsorAnimal: this.sponsorAnimal,
            animal: this.sponsorAnimal.animal 
          }
          this.dialogRef.close(newResponse);
        } else {
          this.snackbarService.openErrorSnackbar("Error al apadrinar", "Cerrar");
          console.error('No data received due to an error.');
          this.closeModal();
        }
      },
      error: err => {
        this.snackbarService.openErrorSnackbar("Error del servidor", "Cerrar");
        this.closeModal();
      
      }
    });
    
  }
}
