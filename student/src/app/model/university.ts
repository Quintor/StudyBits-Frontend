export class University {
  id: number;
  name: string;
  endpoint: string;

  constructor(id: number, name: string, endpoint: string) {
    this.id = id;
    this.name = name;
    this.endpoint = endpoint;
  }
}
