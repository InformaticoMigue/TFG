import { Component, Input, OnInit } from '@angular/core';
import { TitleSectionComponent } from "../title-section/title-section.component";
import { Aclass } from '../..//assets/types';
import { Specie } from '../../assets/types';

@Component({
    selector: 'app-our-animals',
    standalone: true,
    templateUrl: './our-animals.component.html',
    styleUrl: './our-animals.component.scss',
    imports: [TitleSectionComponent]
})
export class OurAnimalsComponent implements OnInit{
  @Input() listClasses!:Aclass[]
  @Input() listSpecies!:Specie[]

  ngOnInit(): void {
    console.log(this.listClasses);
    
  }

}
