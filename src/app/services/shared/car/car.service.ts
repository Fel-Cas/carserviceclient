import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CarService {
  public API = '//thawing-chamber-47973.herokuapp.com/cars';
  public CAR_API = this.API + '/cars';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API );
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(car: any): Observable<any> {
    let result: Observable<Object>;
    if (car['href']) {
      result = this.http.put(car.href, car);
    } else {
      result = this.http.post(this.API, car);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
  updateCar(url:string,data): Observable<any>{
    return this.http.put(url,data)
  }
}
