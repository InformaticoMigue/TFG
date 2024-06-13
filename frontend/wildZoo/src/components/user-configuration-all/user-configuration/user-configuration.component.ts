import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { HeaderComponent } from '../../content-web-components/header/header.component';
import { AuthService } from '../../../service/auth/auth.service';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { UserService } from '../../../service/zoo/user.service';
import { User } from '../../../assets/types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCreditCard, faKey, faMoneyBill, faUserAltSlash, faUserAstronaut, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserCreditCardComponent } from '../user-credit-card/user-credit-card.component';
import { UserChangePasswordComponent } from '../user-change-password/user-change-password.component';
import { UserPaymentsComponent } from '../user-payments/user-payments.component';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-user-configuration',
  standalone: true,
  imports: [HeaderComponent, FontAwesomeModule, CommonModule, MatTabsModule, UserChangePasswordComponent,UserDetailsComponent,UserCreditCardComponent,UserPaymentsComponent],
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.scss']
})
export class UserConfigurationComponent implements OnInit {
  public title: any;
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  public user!: User;
  public payamentsData:any;

  ngOnInit() {
    this.initAllSuscriptions();
  }

  initAllSuscriptions() {
    this.getUserData().pipe(
      switchMap(user => {
        return this.userService.find(user.id);
      })
    ).subscribe(userData => {
      const user = userData.data;
      this.user = user; 
      this.payamentsData = {
        ticketSales: this.user.tickets,
        packageSales: this.user.packageSales
      }
      this.title = `Configuración de de usuario`
    })
  }

  getUserData(){
    return this.authService.currentUser$
  }

}
