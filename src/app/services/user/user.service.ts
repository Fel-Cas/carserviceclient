import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url='//thawing-chamber-47973.herokuapp.com/owners';
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.url);
  }

  save(user: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.url, user);
    return result;
  }

  getUser(id:string){
    return this.http.get(this.url + '/' + id);
  }

  updateUser(id:string,user:any): Observable<any>{
    return this.http.put(this.url+'/'+id,user);
  }

  delete(link:string): Observable<any>{
      return this.http.delete(link);

  }
  deleteById(id:string): Observable<any>{
    return this.http.delete(this.url+'/'+id);
  }


}
