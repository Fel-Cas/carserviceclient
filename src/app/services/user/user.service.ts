import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url='//thawing-chamber-47973.herokuapp.com/owners';
  constructor(private http:HttpClient) { }
  /**
   * Obtener todos los propietarios.
   */
  getUsers():Observable<any>{
    return this.http.get(this.url);
  }
  /**
   * Guarda un propietario
   */
  save(user: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.url, user);
    return result;
  }
  /**
   * Obtiene un propietario por el ID especifico.
   */
  getUser(id:string){
    return this.http.get(this.url + '/' + id);
  }
  /***
   * Actualiza un propietario.
   */
  updateUser(id:string,user:any): Observable<any>{
    return this.http.put(this.url+'/'+id,user);
  }
  /***
   * Elimina un propietario, se le pasa el href por parametro.
   */
  delete(link:string): Observable<any>{
      return this.http.delete(link);

  }
  /***
   * Elimina un usuario proporcionandole el id.
   */
  deleteById(id:string): Observable<any>{
    return this.http.delete(this.url+'/'+id);
  }


}
