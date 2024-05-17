import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButton } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [FontAwesomeModule,MatButton],
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit {
  
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any) {
      console.log(data);
   }

  ngOnInit() {
  }

  closeSnackbar(){
    this.data.snackbar.dismiss();
  }
}
