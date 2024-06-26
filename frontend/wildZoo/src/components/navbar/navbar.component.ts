import { CommonModule } from '@angular/common';
import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars,faUser,faAngleUp, faRightFromBracket, faUserCircle, faCog, faSignInAlt, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidevarComponent } from "../sidevar/sidevar.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Observable, forkJoin } from 'rxjs';
import { Aclass, Package } from '../../assets/types';
import { PackageService } from '../../service/zoo/package.service';
import { StorageService } from '../../service/storage/storage.service';
import { ModalFormLoginComponent } from '../home-components/modals/modal-form-login/modal-form-login.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { NavbarTopComponent } from '../navbar-top/navbar-top.component';
import { EventService } from '../../service/zoo/event.service';
import { Event } from '../../assets/types';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [RouterLink, NavbarTopComponent, MatMenuModule,MatTooltipModule, MatButtonModule, MatDialogModule,FontAwesomeModule, CommonModule, MatSidenavModule, SidevarComponent]
})

export class NavbarComponent implements OnInit {
  public dialog:MatDialog = inject(MatDialog);
  public iconOpenSidebar = faBars;
  public iconCloseSidebar = faXmark;
  public iconUser = faUser;
  public iconCollapse = faAngleUp;
  public iconLogOut = faRightFromBracket;
  public faUserCircle = faUserCircle;
  public faCog = faCog;
  public faSignOutAlt = faSignInAlt;
  public responsive: boolean = false;
  public allClasses: Aclass[] = [];
  public allPackages: Package[] = [];
  public allEvents:Event[] = [];
  public logged: boolean = false;
  private packageService = inject(PackageService);
  public menuStates: {[key: string]: boolean} = {
    packages: false,
    events: false,
  };
  private authService:AuthService = inject(AuthService);
  public storageService:StorageService = inject(StorageService);
  private router:Router = inject(Router);
  private eventService:EventService = inject(EventService);

  ngOnInit(): void {
    this.getActuallyUser();
    this.initAllSuscriptions();
    this.onResize();
  }

  public initAllSuscriptions(): void {
    const observableArray: Observable<any>[] = [
      this.getAllPackages(),
      this.getAllEvents(),
    ]
    
    forkJoin(observableArray).subscribe((responses:any[]) => {
        const packages = responses[0].data
        this.allPackages = packages;
        this.allEvents = responses[1].data
        this.allEvents = this.allEvents.filter(event => new Date(event.date).getTime() >= new Date().getTime())

    })
  }

  toggleMenu(menu: string): void {
    this.menuStates[menu] = !this.menuStates[menu];
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  openModalLogin(): void {
    this.dialog.open(ModalFormLoginComponent, {
      width: '1200px',
      height: '625px',
      panelClass: ['custom-dialog-transparent','overflow-hidden','p-0']
    })
  }

  @HostListener('window:resize', [])
  onResize() {    
    if (window.innerWidth <= 1350) {
      this.responsive = true;
    } else {
      this.responsive = false;
    }    
  }
  public getAllPackages() {
    return this.packageService.getAll();    
  }
  
  getActuallyUser(){
    this.authService.isLoggedIn$.subscribe(log => {
      this.logged = log;
    });
  }

  getAllEvents(){
    return this.eventService.getAll();
  }
}
