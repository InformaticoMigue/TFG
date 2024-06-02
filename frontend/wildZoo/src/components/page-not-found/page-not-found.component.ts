import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  private router:Router = inject(Router)
  private location:Location = inject(Location)

  goToHome(){
    this.router.navigate(['/']);
  }
  goToPrevious(){
    this.location.back();
  }
}
