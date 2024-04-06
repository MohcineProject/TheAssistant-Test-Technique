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

        // Sorting teachers and students 
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

        //Using the dates to generate the year of the students
        this.students.forEach ((student) => {
          const suffixes = ["First Year", "Second Year", "Third Year"] ;
          const arrival = new Date(student.arrivalDate) ; 
          const current = new Date("12/11/1991") ; 
          const difference = current.getFullYear() - arrival.getFullYear() ; 
          student.arrivalDate = (difference) <= 2  ? suffixes[difference] : "Graduated" ; 

        })
        this.teachers.forEach(teacher => {
          const arrivalDate = new Date(teacher.arrivalDate) ; 
          teacher.arrivalDate =  (arrivalDate.getMonth() + 1).toString().padStart(2, '0') + "." + arrivalDate.getDate().toString().padStart(2, '0') + "."  + arrivalDate.getFullYear() ; 
        } ) ; 
      }
    );
  }


  
}