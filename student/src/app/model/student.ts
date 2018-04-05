import { University } from './university';

export class Student {
  id: number;
  userName: string;
  originUniversity: University;

  constructor(id: number, userName: string , originUniversity: University) {
    this.id = id;
    this.userName = userName;
    this.originUniversity = originUniversity;
  }
}
