import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/shared/car/car.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:Array<any>;
  ids:Array<any>=[];
  message;
  datos=0;
  userForm:FormGroup;
  constructor(private userService:UserService,private router:Router,private fb:FormBuilder,private carService:CarService) {
    this.userForm=this.fb.group({
      checkArray: this.fb.array([])
    });
  }

  ngOnInit() {
    this.getAllUsers();

}
  getAllUsers(){
    this.userService.getUsers().subscribe(data=>{
      this.users=data._embedded.owners;
      this.datos=this.users.length;
      this.obtenerId(this.users);
    },error=>{
      console.log(error);
    });
  }

  deleteUser(url){
    let partes=url.split('/');
    this.eliminarRelacion([partes[partes.length-1]]);
    this.userService.delete(url).subscribe(result => {
    }, error => console.error(error));
    this.router.navigate(['/car-list']);
  }

  obtenerId(lista:Array<any>){
      let longitud=lista.length;
      for(let i=0;i<longitud;i++){
        let n=lista[i]._links.owner.href
        let partes=n.split('/');
        this.ids.push({value:partes[partes.length-1]})
        lista[i]._links.self.href=partes[partes.length-1];
      }
  }

  removeUsers(){
    this.ids=this.userForm.value.checkArray;
    if(this.ids.length!==0){
      console.log(this.ids);
      for(let i of this.ids){
        console.log(i);
        this.eliminarRelacion(i);
        this.userService.deleteById(i).subscribe(data=>{

        },error=>{
          this.message=`El usuario con el ID ${i} no existe`;
          console.log(error);
        });
      }
      this.router.navigate(['/car-list']);
    }else{
      console.log('Array vacio');
      this.message="Debe seleccinar por lo menos un propietario a borrar.";
    }

  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.userForm.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  eliminarRelacion(id){
      console.log(id);
      this.userService.getUser(id).subscribe(data=>{
        let dni=data['dni']
        console.log(dni);
        this.carService.getAll().subscribe(data=>{
          console.log(data._embedded.cars);
          let usuarios=data._embedded.cars;
          for(let usuario of usuarios){
              if(usuario['ownerDni']==dni){
                usuario['ownerDni']=null;
                console.log(usuario['_links']['car']['href']);
                this.carService.updateCar(usuario['_links']['car']['href'],usuario).subscribe(data=>{},error=>{
                  console.log(error);
                });
              }
          }
        },error=>{
          console.log(error);
        });
      },error=>{
        console.log(error);
      });
    }

  }
