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

@Component({
  selector: 'app-user-configuration',
  standalone: true,
  imports: [HeaderComponent,FontAwesomeModule],
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.scss']
})
export class UserConfigurationComponent implements OnInit {
  public title: any;
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  public user!: User;
  public userIcon:IconDefinition = faUserEdit
  public creditCardIcon:IconDefinition = faCreditCard
  public passwordIcon:IconDefinition = faKey
  public paymentIcon:IconDefinition = faMoneyBill

  public componentesView = {
    userDetails: UserDetailsComponent,
    creditCard: UserCreditCardComponent,
    changePassword: UserChangePasswordComponent,
    payments: UserPaymentsComponent
  }
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  ngOnInit() {
    this.initAllSuscriptions();
  }


  loadComponent(component: any, data?: any){
    this.container.clear();
    const compRef = this.container.createComponent(component);
    this.addDataToComponent(compRef, data);
  }

  addDataToComponent(component: any, data?:any){ 
    console.log(this.user);
    
    component.instance.user = this.user;  
    
    if (component.instance instanceof UserCreditCardComponent && data) { 
      component.instance.creditCardData = data;
    }else if(component.instance instanceof UserPaymentsComponent && data) {
      component.instance.paymentsData = data;
    }
  }

  initAllSuscriptions() {
    this.getUserData().pipe(
      switchMap(user => {
        return this.userService.find(user.id);
      })
    ).subscribe(userData => {
      const user = userData.data;
      this.user = user;      
      this.title = `Configuración de de usuario`
      this.loadComponent(UserDetailsComponent)

    })
  }
  

  getUserData(){
    return this.authService.currentUser$
  }

}
