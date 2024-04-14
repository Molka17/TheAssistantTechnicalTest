import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from './person';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TeacherDataService {
  allTeachers: Person[] = [];
  constructor(private http: HttpClient) {
  }

  fetchTeachers(): Observable<Person[]> {
    return this.http.get<Person[]>('assets/data.json').pipe(
      map(data => data.filter(item => item.isTeacher)), // Correctly placed filter inside the map
      map(filteredData => filteredData.map(item => {
        // Create a new instance of Person
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
        person.color = person.setColorForTeachers();
        console.log(person.color);
        this.allTeachers.push(person);
        return person;
      }))
    );
  }
}