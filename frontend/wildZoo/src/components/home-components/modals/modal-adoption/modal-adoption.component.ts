import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AdoptionService } from '../../../../service/zoo/adoption.service';
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
  private adoptionService:AdoptionService = inject(AdoptionService);
  private snackbarService:CustomSnackbarService = inject(CustomSnackbarService);
  public adoptionAnimal:any;
  public formAdoption:FormGroup = new FormGroup({});
  private user!:User;

  constructor(public dialogRef: MatDialogRef<ModalAdoptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.adoptionAnimal = data.adoptionAnimal;
    this.user = data.user;        
  }

  ngOnInit() {
    this.formAdoption = this.formBuilder.group({
      price: [this.adoptionAnimal.price, [Validators.required]]
    })
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  adoption(){
    if (!this.user) {
      this.snackbarService.openErrorSnackbar("Necesita estar logueado para adoptar a un animal", "Cerrar");
      return;
    }
    if (!this.user.creditCard) {
      this.snackbarService.openErrorSnackbar("Necesita tener una tarjeta de crédito para adoptar a un animal", "Cerrar");
      return;
    }

    const objectToRequest = {
      date: new Date(),
      adoptionAnimal: {
        id: this.adoptionAnimal.id
      },
      animal: {
        id: this.adoptionAnimal.animal.id
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
          this.snackbarService.openSucessSnackbar(this.adoptionAnimal.animal.name + " Adoptado con éxtio", "Cerrar")
          const newResponse = {
            date: data.data.date,
            id: data.data.id,
            user: this.user,
            adoptionAnimal: this.adoptionAnimal,
            animal: this.adoptionAnimal.animal 
          }
          this.dialogRef.close(newResponse);
        } else {
          this.snackbarService.openErrorSnackbar("Error al adoptar", "Cerrar");
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
