import { Component , Input  } from '@angular/core';
import { Person } from '../person';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  
  @Input()
  person!: Person;

  colorMap : {[key:string] : string} = {
    "Transfiguration" : "#FF0000",
    "Gryffindor" : "#FF0000", 
    "Slytherin" : "#008000" , 
    "Potions" : "#008000" ,
    "Herbology" : "#FFFF00" , 
    "Charms" : "#0000FF" ,
  
  }
  getColorForItem(item: string): string {
    return this.colorMap[item] || '#ffffff'; 
  }
  constructor() {}

}
