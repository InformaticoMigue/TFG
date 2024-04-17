import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars,faUser } from '@fortawesome/free-solid-svg-icons';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidevarComponent } from "../sidevar/sidevar.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalTicketsComponent } from '../modals/modal-tickets/modal-tickets.component';
import { TicketService } from '../../service/tickets/ticket.service';
import { ModalFormLoginComponent } from '../modals/modal-form-login/modal-form-login.component';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    imports: [MatTooltipModule, MatButtonModule, MatDialogModule,FontAwesomeModule, CommonModule, MatSidenavModule, SidevarComponent]
})

export class NavbarComponent implements OnInit {
  public dialog:MatDialog = inject(MatDialog);
  public iconSidebar = faBars;
  public iconUser = faUser;
  public responsive: boolean = false;
  private ticketService: TicketService = inject(TicketService);
  private logged = localStorage.getItem('user');


  ngOnInit(): void {
    this.onResize();
  }

  openModalTicket(): void {
    this.dialog.open(ModalTicketsComponent, {
      data: {
        isLogin: this.logged ? true : false
      }
    })
  }

  openModalLogin(): void {
    this.dialog.open(ModalFormLoginComponent, {
      width: '700px',
      height: '500px',
      panelClass: ['overflow-hidden','p-0']
    })
  }

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth <= 768) {
      this.responsive = true;
    } else {
      this.responsive = false;
    }    
  }
}
