import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { User } from '../../../assets/types';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [MatExpansionModule, FontAwesomeModule, MatAccordion, ReactiveFormsModule, MatFormField, MatLabel, MatInput, CommonModule],
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder)
  public formDetailsUser: FormGroup = new FormGroup({});
  public user!: User;
  public adoptionItems: any;

  ngOnInit() {
    this.formDetailsUser = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      firstSurname: [this.user.firstSurname, Validators.required],
      lastSurname: [this.user.lastSurname, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    })
    this.setAccordionItems();
  }

  onSubmit() {

  }

  setAccordionItems() {
    this.adoptionItems = {
      icon: faPaw, 
      title: "Adopciones", 
      adoptions: this.user.adoptions
    }
  }
}
