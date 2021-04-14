import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users!: Observable<User[]>;

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private readonly afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
    this.getUsers();
   }

   onRegister(user: User, userId: string): Promise<void> { 
    return new Promise(async (resolve, reject) => {
      try {
        const idd = userId || this.afs.createId();
        //{id,  ...user};
        const data = { idd,  ...user};
        const result = await this.usersCollection.doc(idd).set(data);
        resolve(result);
      }catch (err){
        reject(err.message);
      }
    });
  }


   onDeleteUser(userId: string): Promise<void>{ 
     return new Promise (async (resolve, reject)=>{
       try {
         const result = await this.usersCollection.doc(userId).delete();
         resolve(result);
       }catch(err){
         reject(err.message);
       }
     });
   }
   onSaveUser(updatedUser: User, userId: string): Promise<void> { 
     return new Promise(async (resolve, reject) => {
       try {
         const idd = userId || this.afs.createId();
         //{id,  ...user};
         const data = { idd,  ...updatedUser};
         const result = await this.usersCollection.doc(idd).set(data);
         resolve(result);
       }catch (err){
         reject(err.message);
       }
     });
   }

   //Va a FireBase, lee la colleccion de users,
   private getUsers(): void {
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as User))
    );
  }
}

