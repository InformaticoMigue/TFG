import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../components/custom-snackbar/custom-snackbar.component';
import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  constructor(protected _snackbar:MatSnackBar){}

  openErrorSnackbar(message: string,action: string){
    this._snackbar.openFromComponent(CustomSnackbarComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: {
        message:message,
        action: action,
        snackbar: this._snackbar,
        icon: faCircleXmark  
      },
      duration: 3000,
      panelClass: 'error-snackbar'
    })
  }
  
  openSucessSnackbar(message: string,action: string){
    this._snackbar.openFromComponent(CustomSnackbarComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: {
        message:message,
        action: action,
        snackbar: this._snackbar,
        icon: faCheck  
      },
      duration: 3000,
      panelClass: 'sucess-snackbar'
    })
  }
}
