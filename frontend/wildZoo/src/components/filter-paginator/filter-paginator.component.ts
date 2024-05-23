import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter-paginator',
  standalone:true,
  templateUrl: './filter-paginator.component.html',
  styleUrls: ['./filter-paginator.component.scss']
})
export class FilterPaginatorComponent implements OnInit,OnChanges {

  @Input() public currentPage!: number;
  @Input() public itemsPerPage!: number;
  @Input() public items:any;
  @Output() getPagedItems = new EventEmitter<any>();
  public pagedItems:any;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] || changes['currentPage'] || changes['itemsPerPage']) {
      this.updatePagedPayments();
    }
  }

  ngOnInit() {
    this.updatePagedPayments(); 
  }

  
  updatePagedPayments(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems = this.items.slice(startIndex, endIndex);
    if (this.pagedItems.length == 0) {
      this.previousPage();
    }
    this.getPagedItems.emit(this.pagedItems);
  }  

  setPage(page: number): void {
    this.currentPage = page;
    this.updatePagedPayments(); 
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  get totalPages(): number {    
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

}
