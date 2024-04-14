import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { TeacherDataService } from '../teacher-data.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class StudentsComponent implements OnInit {

  allStudents: Person[] = [];
  allTeachers: Person[] = [];

  constructor(private http: HttpClient, private teacherDataService: TeacherDataService) {}

  ngOnInit(): void {
    this.allTeachers = this.teacherDataService.allTeachers;

    this.fetchStudents();
    console.log("Finished fetching students");
  }
  fetchStudents() {
    this.http.get<Person[]>('assets/data.json').subscribe(data => {
      this.allStudents = data.filter(item => !item.isTeacher)
        .sort((a: Person, b: Person) => {
          // Sort first by house, then by first name
          if (a.house < b.house) return -1;
          if (a.house > b.house) return 1;
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
          return 0;
        })
        .map(item => {
          const person = new Person(
            item.id,
            item.firstName,
            item.lastName,
            item.description,
            item.arrivalDate,
            item.house,
            item.assignment,
            item.isTeacher,
          );
          person.color = person.setColorForStudents(this.allTeachers);
          console.log(person.color);
          return person;
        });
      console.log(this.allStudents);
    });
  }
}
