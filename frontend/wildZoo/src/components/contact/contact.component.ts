import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../content-web-components/header/header.component';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLocationDot, faPhone, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../service/contact/contact.service';
import { ContactForm } from '../../assets/types';
import { CustomSnackbarService } from '../../service/snackbar/custom-snackbar.service';
import { catchError, of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [HeaderComponent, CommonModule ,FontAwesomeModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private formBuilder:FormBuilder = inject(FormBuilder)
  private contactService:ContactService = inject(ContactService)
  private snackbarService:CustomSnackbarService = inject(CustomSnackbarService)
  public phoneIcon:IconDefinition = faPhone;
  public emailIcon:IconDefinition = faEnvelope;
  public locationIcon:IconDefinition = faLocationDot
  public messageForm:FormGroup = new FormGroup({});

  
  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.messageForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', Validators.compose([Validators.required,Validators.pattern(/^6[0-9]{8}$/)    ])],
      description: ['',[Validators.required]],
      email: ['',Validators.compose([Validators.required,Validators.email])]
    })
  }

  sendMessage(){
    const contact:ContactForm = {
      name: this.messageForm.get('name')?.value,
      description: this.messageForm.get('description')?.value,
      email: this.messageForm.get('email')?.value,
      phone: this.messageForm.get('phone')?.value
    }

    this.contactService.sendMessage(contact).pipe(
      catchError(err => {
        return of(null);
      })
    ).subscribe((res) => {
      if (res) {
        this.snackbarService.openSucessSnackbar("Correo enviado con exito", "Cerrar")        
      }else{
        this.snackbarService.openErrorSnackbar("Error al enviar el correo", "Cerrar")        
      }
    })    
  }
}
