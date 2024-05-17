import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { PackageService } from '../../../service/zoo/package.service';
import { CustomSnackbarService } from '../../../service/snackbar/custom-snackbar.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FilterPaginatorComponent } from '../../filter-paginator/filter-paginator.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,FilterPaginatorComponent,MatDialogModule],
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.scss']
})
export class UserPaymentsComponent implements OnInit {
  public paymentsData: any;
  public allPayments: any;
  public allPaymentsAux: any;
  public user:any;
  private packageService:PackageService = inject(PackageService)
  private snackbarService:CustomSnackbarService = inject(CustomSnackbarService)
  private dialog:MatDialog = inject(MatDialog);

  ngOnInit() {
    this.initPaymentsData();
  }
  
  private initPaymentsData() {
    this.allPayments = [...this.paymentsData.ticketSales, ...this.paymentsData.packageSales]
    this.allPayments.forEach((element:any) => {
      if(element.apackage != undefined){
        element.type = 'Paquete'
       }else{
        element.type = 'Ticket'
      }
    });
  }

  deletePackageSale(aPackage:any){
    this.packageService.deletePackageSale(aPackage.id).subscribe(({
      next: () => {
        this.snackbarService.openSucessSnackbar("Paquete eliminado con exito", "Cerrar")
        this.allPayments = this.allPayments.filter((payment:any) => payment.id != aPackage.id)        
      },
      error: () => {
        this.snackbarService.openErrorSnackbar("Error del servidor", "Cerrar")
      }
    }))
  }
  
  handlePagedItems($event: any) {
    this.allPaymentsAux = $event
  }    
}
