import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';
import { HogwartService } from './hogwart.service';
import { Person } from './person';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hogwarts';
  persons: Person[] = [];
  teachers: Person[] = [];
  students: Person[] = [];

  
  constructor(private hogwartService: HogwartService) { }

  ngOnInit(): void {
    this.hogwartService.loadData('../assets/data.json').subscribe(
      persons => {
        this.persons = persons;
        this.teachers = this.persons.filter((person) => person.isTeacher);
        this.students = this.persons.filter((person) => !person.isTeacher);

        // Sort teachers by arrival date
        this.teachers.sort((a, b) => {
          const dateA = new Date(a.arrivalDate);
          const dateB = new Date(b.arrivalDate);
          return  - (dateB.getTime() - dateA.getTime()) ;
        });

        this.students.sort((a, b) => {
          if (a.house !== b.house) {
            return a.house > b.house ? 1 : -1;
          } else {
            return a.firstName > b.firstName ? 1 : -1;
          }
        });
        this.students.forEach ((student) => {
          const suffixes = ["First Year", "Second Year", "Third Year"] ;
          const arrival = new Date(student.arrivalDate) ; 
          const current = new Date("12/11/1991") ; 
          const difference = current.getFullYear() - arrival.getFullYear() ; 
          student.arrivalDate = (difference) <= 2  ? suffixes[difference] : "Graduated" ; 

        })
        

        console.log(this.teachers);
      }
    );
  }


  
}