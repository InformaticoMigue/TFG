import { Component, Input } from '@angular/core';
import { TitleSectionComponent } from "../title-section/title-section.component";
import { Specie } from '../../assets/types';

@Component({
    selector: 'app-our-animals',
    standalone: true,
    templateUrl: './our-animals.component.html',
    styleUrl: './our-animals.component.scss',
    imports: [TitleSectionComponent]
})
export class OurAnimalsComponent {
  @Input() listSpecies!:Specie[]
}
