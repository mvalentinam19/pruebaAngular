import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user : any;
  userrForm :any = FormGroup;
  private isEmail =/\$+@\$+\.\$+/;
  constructor( private router: Router, private fb: FormBuilder, private usersSvc: UsersService) {
    
    const navigation =this.router.getCurrentNavigation();
    this.user = navigation?.extras?.state;
    
    this.initForm();
   }
   

  ngOnInit(): void {
    if (typeof this.user == 'undefined'){
      //Redirect
      this.router.navigate(['register']);
    }else{
      this.userrForm.patchValue(this.user);
    }
  }
  onRegister() :void{
    console.log('Guardado', this.userrForm.value);
  
        const user = this.userrForm.value;
        const userId = this.user?.idd ;
        this.usersSvc.onRegister(user, userId);
        this.router.navigate(['list']);
    
  }

  private initForm():void {
    this.userrForm = this.fb.group({
      nombre: [null, [Validators.required]],
      correo: [null, [Validators.required, Validators.pattern(this.isEmail)]],
      id: [null, [Validators.required]], 
      celular: [null, [Validators.required]], 
      contra: [null, [Validators.required]]
    })  
  }

  

}
