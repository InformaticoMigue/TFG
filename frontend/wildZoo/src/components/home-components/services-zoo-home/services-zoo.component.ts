import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { TitleSectionComponent } from "../../title-section/title-section.component";
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ZooServiceService } from '../../../service/zoo/zoo-service.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Service } from '../../../assets/types';
import { ServiceZooCardComponent } from "../service-zoo-card-home/service-zoo-card.component";

@Component({
    selector: 'app-services-zoo',
    standalone: true,
    templateUrl: './services-zoo.component.html',
    styleUrls: ['./services-zoo.component.scss'],
    imports: [FontAwesomeModule, TitleSectionComponent, ServiceZooCardComponent]
})
export class ServicesZooComponent implements OnInit {
  public iconMobile = faMobileScreen
  public allServices: Service[] = [];
  public initAllServices: Service[] = [];
  public show = false;
  private servicesZooService = inject(ZooServiceService)
  @ViewChild('scrollDownRef') scrollDownRef!: ElementRef;

  ngOnInit() {
    this.initAllSuscriptions()
  }

  initAllSuscriptions() {
    const observableArray: Observable<any>[] = [
      this.getAllServices()
    ];

    forkJoin(observableArray).subscribe((response: any) => {
        this.allServices = response[0].data
        this.initAllServices = this.allServices.filter((s: any, index: any) => index <= 2);
    });
  }

  getAllServices() {
    return this.servicesZooService.getAll();
  }

  showAllServices() {
    this.show = true;
    setTimeout(() => {
      if (this.scrollDownRef) {
        this.scrollDownRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 0);
  }
}
