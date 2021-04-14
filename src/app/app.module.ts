import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HeaderModule } from './shared/header/header.module';
import { RegisterModule } from './pages/users/register/register.module';
import { ListModule } from './pages/users/list/list.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    RegisterModule,
    ListModule

    
  ],
  providers: [AngularFirestore],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
