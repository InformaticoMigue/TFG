import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  standalone: true,
  imports: [NavbarComponent, MatButtonModule, RouterLink],
  styleUrls: ['./header-home.component.scss']
})
export class HeaderHomeComponent implements OnInit, AfterViewInit {
  
  private route:ActivatedRoute = inject(ActivatedRoute)
  private router:Router = inject(Router);
  
  ngOnInit() {}

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      this.scrollToFragment(fragment);
    });
  }

  scrollToSection(fragment: string) {
    this.router.navigate(['/home'], { fragment }).then(() => {
      this.scrollToFragment(fragment);
    });
  }

  private scrollToFragment(fragment: string | null) {
    if (fragment) {
      const element = document.getElementById(fragment);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
