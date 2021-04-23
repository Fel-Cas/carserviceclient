export class User{
  _id?:number;
  dni:string;
  profession:string;
  name:string;
  _links?:string;

  constructor(dni:string,
    profession:string,
    name:string){
      this.dni=dni;
      this.profession=profession;
      this.name=name;

  }
}
