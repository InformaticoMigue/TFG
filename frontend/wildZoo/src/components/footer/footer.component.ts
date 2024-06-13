import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Event, Package } from '../../assets/types';
import { PackageService } from '../../service/zoo/package.service';
import { EventService } from '../../service/zoo/event.service';
import { catchError, forkJoin, of, throwError } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faInstagram, faPinterest, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public allPackages:Package[] = [];
  public allEvents:Event[] = [];
  private packageService:PackageService = inject(PackageService)
  private eventService:EventService = inject(EventService)
  public facebookIcon:IconDefinition = faFacebook
  public pinterestIcon:IconDefinition = faPinterest
  public twitterIcon:IconDefinition = faXTwitter
  public instagramIcon:IconDefinition = faInstagram

  ngOnInit() {
    this.initAllSuscriptions();
  }

  private initAllSuscriptions(): void {
    forkJoin(
      {
        packages: this.getAllPackages().pipe(
          catchError((error) => {
            return throwError(() => error)
          })
        ), 
        events: this.getAllEvents().pipe(
          catchError((error) => {
            return throwError(() => error)
          })
        )
      }).subscribe(all => {
        this.allPackages = all.packages.data
        this.allEvents = all.events.data.filter(event => new Date(event.date).getTime() >= new Date().getTime())
      })  
  }

  getAllPackages() {
    return this.packageService.getAll();
  }

  getAllEvents() {
    return this.eventService.getAll();
  }
}
