import { CommonModule } from '@angular/common';
import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars,faUser,faAngleUp, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
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
import { ModalTicketsComponent } from '../home-components/modals/modal-tickets/modal-tickets.component';
import { ModalFormLoginComponent } from '../home-components/modals/modal-form-login/modal-form-login.component';


@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [MatMenuModule,MatTooltipModule, MatButtonModule, MatDialogModule,FontAwesomeModule, CommonModule, MatSidenavModule, SidevarComponent]
})

export class NavbarComponent implements OnInit {
  public dialog:MatDialog = inject(MatDialog);
  public iconSidebar = faBars;
  public iconUser = faUser;
  public iconCollapse = faAngleUp;
  public iconLogOut = faRightFromBracket;
  public responsive: boolean = false;
  public allClasses: Aclass[] = [];
  public allPackages: Package[] = [];
  public logged: boolean = false;
  private packageService = inject(PackageService);
  public menuStates: {[key: string]: boolean} = {
    packages: false,
  };
  private storageService = inject(StorageService);

  ngOnInit(): void {
    this.logged = !!this.storageService.getData("tokenUser");
    this.storageService.isLogged.subscribe((loggedIn: boolean) => {
      this.logged = loggedIn;
    });
    this.initAllSuscriptions();
    this.onResize();
  }

  public initAllSuscriptions(): void {
    const observableArray: Observable<any>[] = [
      this.getAllPackages(),
    ]
    
    forkJoin(observableArray).subscribe((responses:any[]) => {
        const packages = responses[0].data
        this.allPackages = packages;
    })
  }

  toggleMenu(menu: string): void {
    this.menuStates[menu] = !this.menuStates[menu];
  }

  openModalTicket(): void {
    this.dialog.open(ModalTicketsComponent, {
      data: {
        isLogin: this.logged ? true : false
      }
    })
  }

  logout(){
    this.storageService.removeData("tokenUser")
    this.storageService.isLogged.emit(false)
  }

  openModalLogin(): void {
    this.dialog.open(ModalFormLoginComponent, {
      width: '1000px',
      height: '500px',
      panelClass: ['overflow-hidden','p-0']
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

}
