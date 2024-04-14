import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { TeacherDataService } from '../teacher-data.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
  allTeachers: Person[] = [];

  constructor(private teacherDataService: TeacherDataService) {}

  ngOnInit(): void {

    this.teacherDataService.fetchTeachers().subscribe(teachers => {
      const referenceDate = new Date('1991-11-12').getTime(); 
      this.allTeachers = teachers
        .filter(item => item.isTeacher)
        .sort((a, b) =>
          (new Date(a.arrivalDate).getTime() - referenceDate) - 
          (new Date(b.arrivalDate).getTime() - referenceDate)
        );

      console.log(this.allTeachers);
    });
  }
}