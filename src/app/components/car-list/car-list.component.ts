import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/shared/car/car.service';
import { GiphyService } from '../../services/shared/giphy/giphy.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;

  constructor(private carService: CarService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      this.cars = data._embedded.cars;
      this.obtenerId(this.cars);
      for (const car of this.cars) {
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });
  }

  obtenerId(lista:Array<any>){
    let longitud=lista.length;
    for(let i=0;i<longitud;i++){
      let n=lista[i]._links.car.href
      let partes=n.split('/');
      lista[i]._links.self.href=partes[partes.length-1];
    }
}
}
