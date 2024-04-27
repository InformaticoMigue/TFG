import {Component, EventEmitter, OnInit, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CardFlip } from '../../../constants/animations';
import { MatButton } from '@angular/material/button';
import { AuthGoogleServiceService } from '../../../service/auth/authGoogleService.service';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { UserService } from '../../../service/zoo/user.service';
import { User } from '../../../assets/types';
import { MatDialogRef } from '@angular/material/dialog';
import { EncryptService } from '../../../service/encrypt/encrypt.service';
import { StorageService } from '../../../service/storage/storage.service';

@Component({
  selector: 'app-modal-form-login',
  standalone: true,
  animations: [CardFlip],
  imports: [ReactiveFormsModule,CommonModule,MatButton, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-form-login.component.html',
  styleUrl: './modal-form-login.component.scss'
})
export class ModalFormLoginComponent implements OnInit {
  private authService = inject(AuthGoogleServiceService)
  public flip: string = 'inactive';
  public profile: any;
  private formBuilder = inject(FormBuilder)
  public formLogin:any;
  private userService:UserService = inject(UserService);
  private allUsers:User[] = [];
  public emailExists: boolean = true;
  public passwordExists: boolean = true;
  private encryptedService:EncryptService = inject(EncryptService);
  private storageService:StorageService = inject(StorageService);

  constructor(public dialogRef: MatDialogRef<ModalFormLoginComponent>){}

  ngOnInit(): void {
    this.showData();  
    this.initFormLogin()
    this.initAllSuscriptions();
  }

  initAllSuscriptions() {
    const observableArray:Observable<any>[] = [
      this.getAllUsers()
    ] 
    
    forkJoin(observableArray).subscribe((responses) => {
      this.allUsers = responses[0].data
    })
  }

  initFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      'email': ['',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
      'password': ['',[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$")]]
    })
  }
  
  cardClicked() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }  

  showData() {
    this.profile = this.authService.getProfile();        
  }

  login(){        
    const email = this.formLogin.get("email").value
    const password = this.encryptedService.encryptData(this.formLogin.get("password").value);    
    this.emailExists = this.allUsers.find(user => user.email === email) ? true : false
    this.passwordExists = this.allUsers.find(user => user.password === password) ? true : false    
    
    if (this.emailExists && this.passwordExists) {
      const user = this.allUsers.find(user => user.email == email && user.password == password)
      this.storageService.saveData("tokenUser", JSON.stringify(user))
      this.storageService.isLogged.emit(true)
      this.dialogRef.close()
    }
  }

  logInWithGoogle() {
    this.authService.login()
    localStorage.setItem('tokenUserOauth', JSON.stringify(this.profile));
    this.dialogRef.close()
  }

  getAllUsers(){
    return this.userService.getAllUsers()
  }
}
