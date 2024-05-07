import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-section.component.html',
  styleUrl: './title-section.component.scss'
})
export class TitleSectionComponent implements OnInit {
  @Input() preTitle!: string;
  @Input() title!: string;
  @Input() wrap!: boolean;
  @Input() white!: boolean;
  public firstPosition!: string;
  public restTitle!: string;

  ngOnInit(): void {
    this.formatTitle(this.title)
  }

  private formatTitle(title: string) {
    const positionFirst =  title.split(" ")[0].toUpperCase()
    const restTitle = title.split(" ").filter((position,index) => index != 0).join(" ")
    this.firstPosition = positionFirst;
    this.restTitle = restTitle
  }

}
