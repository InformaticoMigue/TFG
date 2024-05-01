import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-tickets',
    standalone: true,
    templateUrl: './modal-tickets.component.html',
    styleUrl: './modal-tickets.component.scss',
    imports: []
})
export class ModalTicketsComponent implements OnInit{
  public login = this.data.isLogin;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {

  }


}
