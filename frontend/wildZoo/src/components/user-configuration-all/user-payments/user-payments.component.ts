import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { PackageService } from '../../../service/zoo/package.service';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FilterPaginatorComponent } from '../../filter-paginator/filter-paginator.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TicketService } from '../../../service/zoo/ticket.service';
import { User } from '../../../assets/types';
import { MatLabel } from '@angular/material/form-field';


@Component({
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatLabel,FilterPaginatorComponent, MatDialogModule],
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.scss']
})
export class UserPaymentsComponent implements OnInit {
  @Input() public paymentsData: any;
  public allPayments: any;
  @Input() public user!: User;
  @Output() packageDelete = new EventEmitter<any>();
  @Output() ticketDelete = new EventEmitter<any>();
  public allPaymentsAux: any;
  private currentPage = 0;
  public pageSize = 5;
  
  ngOnInit() {
    this.initPaymentsData();
  }

  private initPaymentsData() {
    this.allPayments = [...this.paymentsData.ticketSales, ...this.paymentsData.packageSales]

    this.allPayments.forEach((element: any) => {
      if (element.apackage != undefined) {
        element.type = 'Paquete'
      } else {
        element.type = 'Ticket'
      }
    });
    this.loadData();
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  loadData() {
    const startIndex = this.currentPage * this.pageSize;
    this.allPaymentsAux = this.allPayments.slice(startIndex, startIndex + this.pageSize);
  }
  

  /*
  Opción deshabilitada
  deleteTicket(ticket: any) {
    this.ticketService.delete(ticket.id).subscribe({
      next: (res) => {
        this.snackbarService.openSucessSnackbar("Ticket eliminado con exito", "Cerrar")
        this.allPayments = this.allPayments.filter((payment: any) => payment.id != ticket.id)
        console.log(this.allPayments);
        this.ticketDelete.emit(ticket)
      },
      error: () => {
        this.snackbarService.openErrorSnackbar("Error del servidor", "Cerrar")
      }
    })
  }
  */

  /*
  Opción deshabilitada
  deletePackageSale(aPackage: any) {
    this.packageService.deletePackageSale(aPackage.id).subscribe(({
      next: () => {
        this.snackbarService.openSucessSnackbar("Paquete eliminado con exito", "Cerrar")
        this.allPayments = this.allPayments.filter((payment: any) => payment.id != aPackage.id)
        this.packageDelete.emit(aPackage)
      },
      error: () => {
        this.snackbarService.openErrorSnackbar("Error del servidor", "Cerrar")
      }
    }))
  }
  */
}
