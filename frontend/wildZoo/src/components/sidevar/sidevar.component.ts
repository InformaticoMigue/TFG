import { Component, Input, OnInit, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAngleUp, faCog, faSignInAlt, faTicket, faUser, faUserCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatTreeModule } from '@angular/material/tree';
import { Package, Event } from '../../assets/types';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormLoginComponent } from '../home-components/modals/modal-form-login/modal-form-login.component';
import { AuthService } from '../../service/auth/auth.service';
import { StorageService } from '../../service/storage/storage.service';

@Component({
  selector: 'app-sidevar',
  standalone: true,
  imports: [MatSidenavModule, FontAwesomeModule, CommonModule, FaIconComponent, RouterLink, MatMenuModule],
  templateUrl: './sidevar.component.html',
  styleUrl: './sidevar.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0%)'
      })),
      state('out', style({
        transform: 'translateX(-100%)'
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})

export class SidevarComponent implements OnInit {
  @Input() public iconOpen!: IconDefinition;
  @Input() public allEvents!: Event[];
  @Input() public allPackages!: Package[];
  @Input() public iconClose!: IconDefinition;
  public isOpenSidebar: boolean = false;
  public icon!: IconDefinition;
  public menuStates: { [key: string]: boolean } = {
    packages: false,
    events: false,
  };
  public iconCollapse = faAngleUp;
  public dialog: MatDialog = inject(MatDialog);
  public iconUser = faUser;
  @Input() public logged!: boolean
  private authService: AuthService = inject(AuthService);
  public storageService: StorageService = inject(StorageService);
  public faUserCircle = faUserCircle;
  public faCog = faCog;
  public faSignOutAlt = faSignInAlt;
  private router:Router = inject(Router);

  ngOnInit(): void {
    this.icon = this.iconOpen
  }

  toogleSidebar() {
    this.isOpenSidebar = !this.isOpenSidebar
  }

  openModalFormLogin() {
    this.dialog.open(ModalFormLoginComponent, {
      width: '1200px',
      height: '625px',
      panelClass: ['custom-dialog-transparent', 'overflow-hidden', 'p-0']
    })
  }

  toggleMenu(menu: string): void {
    this.menuStates[menu] = !this.menuStates[menu];
  }

  logout() {
    this.authService.logout();
    this.isOpenSidebar = false;
    this.router.navigate(['/']);
  }

  getActuallyUser() {
    this.authService.isLoggedIn$.subscribe(log => {
      this.logged = log;
    });
  }
}
