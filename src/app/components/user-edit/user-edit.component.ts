import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormArray, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  UserForm:FormGroup;
  user: any = {};
  sub:Subscription;
  titulo='Crear Usuario';
  id:string |null;
  constructor(private fb:FormBuilder,
    private router:Router,
    private userService:UserService,
    private route: ActivatedRoute) {
    this.UserForm=this.fb.group({
      dni:['',Validators.required],
      profession:['',Validators.required],
      name:['',Validators.required]
    });
    this.id=this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.esEditar();
  }

  /**
   * Método que se utiliza para crear los propietarios.
   */
  addUser(){
    console.log(this.UserForm.value);
    if(this.id!==null){
      this.userService.updateUser(this.id,this.UserForm.value).subscribe(data=>{
        console.log('Actulizado');
      });

    }else{
      this.userService.save(this.UserForm.value).subscribe(result => {
        console.log('Creado');
      }, error => console.error(error));
    }

    this.router.navigate(['/user-list']);
  }
  /**
   * Método que verifica a través del la url si se va a editar un propietario o
   * solo se va a crear uno nuevo.
   */
  esEditar(){
    if(this.id!==null){
      this.titulo="Editar Producto";
      this.userService.getUser(this.id).subscribe(data=>{
        this.user=data;
        console.log(this.user);
        this.UserForm.setValue({
          dni:this.user.dni,
          profession:this.user.profession,
          name:this.user.name

        });
      });
    }
  }
}
