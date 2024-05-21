import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../service/loading/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  template: `
<div *ngIf="loadingService.loading$ | async" class="fixed inset-0 flex justify-center items-center z-[3939392002328283828928398398232]">
  <mat-spinner diameter="200"></mat-spinner>
</div>
`,
})
export class SpinnerComponent implements OnInit {

  public loadingService: LoadingService = inject(LoadingService);

  constructor() { }

  ngOnInit() {
  }

}
