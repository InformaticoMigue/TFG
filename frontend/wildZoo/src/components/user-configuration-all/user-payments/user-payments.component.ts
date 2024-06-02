import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild, inject } from '@angular/core';
import { PackageService } from '../../../service/zoo/package.service';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterPaginatorComponent } from '../../filter-paginator/filter-paginator.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TicketService } from '../../../service/zoo/ticket.service';


@Component({
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, FilterPaginatorComponent, MatDialogModule],
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.scss']
})
export class UserPaymentsComponent implements OnInit {
  public paymentsData: any;
  public allPayments: any;
  public allPaymentsAux: any;
  public user: any;
  private packageService: PackageService = inject(PackageService)
  private snackbarService: CustomSnackbarService = inject(CustomSnackbarService)
  private dialog: MatDialog = inject(MatDialog);
  private ticketService: TicketService = inject(TicketService);
  @Output() packageDelete = new EventEmitter<any>();
  @Output() ticketDelete = new EventEmitter<any>();

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
  handlePagedItems($event: any) {
    this.allPaymentsAux = $event
  }
}
