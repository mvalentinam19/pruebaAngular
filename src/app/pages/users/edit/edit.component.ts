import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  updatedUser:  any ;
  userForm :any = FormGroup;
  private isEmail =/\$+@\$+\.\$+/;
  constructor( private router: Router, private fb: FormBuilder, private usersSvc: UsersService) { 

    const navigation =this.router.getCurrentNavigation();
    this.updatedUser = navigation?.extras?.state;
    this.initForm();
  }

  ngOnInit(): void {
    
    if (typeof this.updatedUser == 'undefined'){
      //Redirect
      this.router.navigate(['list']);
    }else{
      this.userForm.patchValue(this.updatedUser);
    }
  }

  onSave() :void{
    console.log('Guardado', this.userForm.value);

        const user = this.userForm.value;
        const userId = this.updatedUser?.idd || null;
        this.usersSvc.onSaveUser(user, userId);
        this.userForm.reset();
    
  }

  onGoToList() :void{
    this.router.navigate(['list']);
  }

  private initForm():void {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      id: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      contra: ['', [Validators.required]]
    })
  }

}
