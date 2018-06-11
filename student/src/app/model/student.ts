export class Student {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  ssn: string;
  originUniversityName: string;

  constructor (userName: string) {
    this.userName = userName;
  }
}
