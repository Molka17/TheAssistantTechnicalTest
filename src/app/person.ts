export class Person {
    id: number;
    firstName: string;
    lastName: string;
    description: string;
    arrivalDate: string;
    house: string;
    assignment?: string;
    isTeacher: boolean;
    color?:string;
    //public static teachers: Person[];


    constructor(
        id: number,
        firstName: string,
        lastName: string,
        description: string,
        arrivalDate: string,
        house: string,
        assignment: string | undefined,
        isTeacher: boolean,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
        this.arrivalDate = arrivalDate;
        this.house = house;
        this.assignment = assignment;
        this.isTeacher = isTeacher;
    }
    public getColor(): string {
        return '#' + Math.floor(Math.random() * 0xEEEEEE).toString(16).padStart(6, '0');
    }
    public setColorForStudents(teachers: Person[]): string | undefined {
        if (!this.color) {
            if (!this.isTeacher) {
                const teacher = this.searchForMyTeacher(teachers);
                if (teacher) {
                    return teacher.color;
                }
            }
        }
        return this.color;
    }
    public setColorForTeachers(): string | undefined {
        if (!this.color) {
            if (this.isTeacher) {
                return this.getColor();
            }
    }
    return this.color;
}


    // public getAllTeachers(): Person[] {
    //     return Person.teachers.filter(person => person.isTeacher);
    // }

    public searchForMyTeacher(teachers: Person[]): Person | undefined {
        return teachers.find(teacher => teacher.description.includes(this.house));
    }
}
