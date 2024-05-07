import { Component, Input, OnInit, inject } from '@angular/core';
import { TitleSectionComponent } from "../../title-section/title-section.component";
import { Aclass, Animal } from '../../../assets/types';
import { Specie } from '../../../assets/types';
import { CountUpComponent } from '../../count-up/count-up.component';
import { OurAnimalsCardComponent } from "../our-animals-card-home/our-animals-card.component";
import { CommonModule } from '@angular/common';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-our-animals',
    standalone: true,
    templateUrl: './our-animals.component.html',
    styleUrl: './our-animals.component.scss',
    imports: [RouterLink, CommonModule, CountUpComponent, TitleSectionComponent, OurAnimalsCardComponent]
})
export class OurAnimalsComponent implements OnInit{
  @Input() listClasses!:any[]
  @Input() listSpecies!:Specie[]
  @Input() listAnimals!:Animal[]
  private ourAnimalCardColor = [
    {bg: 'bg-primary', text: 'text-text'},
    {bg: 'bg-gray-100', text: 'text-text'},
    {bg: 'bg-text', text: 'text-white'}
  ];
  public allCountUp:any;
  private dataAosDuration:number = 1500;

  ngOnInit(): void {
    this.initAllConfigurations();
  }

  private initAllConfigurations(): void {
    this.allCountUp = this.setAllCountUp()
    this.listClasses = this.mapClasses()    
  }

  public mapClasses(){
    return this.listClasses.map((Aclass,index:number) => {
      return {
        ...Aclass,
        dataAosDuration: this.dataAosDuration + (index*250)
      }
    })
  }

  private setAllCountUp(){
    return [
      { id: 1, name: "Clases", number: this.listClasses.length, options: {enableScrollSpy: true,  startVal: 0, useEasing: true, duration: 4, decimalPlaces: 0}},
      { id: 2, name: "Especies",number: this.listSpecies.length, options: { enableScrollSpy: true, startVal: 0, useEasing: true, duration: 4, decimalPlaces: 0}},
      { id: 3, name: "Animales",number: this.listAnimals.length, options: { enableScrollSpy: true, startVal: 0, useEasing: true, duration: 4, decimalPlaces: 0}},
    ]
  }

  public setColorOurAnimal(index:number) {        
    const colorIndex = index % this.ourAnimalCardColor.length;
    return this.ourAnimalCardColor[colorIndex];
  }

}
