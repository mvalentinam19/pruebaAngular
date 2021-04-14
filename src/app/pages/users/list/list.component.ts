import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../../../shared/models/user.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users$ = this.usersSvc.users;
  navigationExtras : NavigationExtras = {
    state: {
      value: null
    } 
  };

  constructor(private router: Router, private usersSvc: UsersService) { }

  ngOnInit(): void {
  }

  onGoToEdit(item:any) :void{
    this.navigationExtras.state = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async onGoToDelete(userId: string): Promise<void> {
    try {
      await this.usersSvc.onDeleteUser(userId);
      alert('Eliminado de la Base de Datos');
      this.onGoToBackToList();
    } catch (err) {
      console.log(err);
    }
  }

  onGoToBack():void{ 
    this.router.navigate(['register']);
  }

  onGoToBackToList():void{ 
    this.router.navigate(['list']);
  }

}
