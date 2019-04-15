import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {ValidateService} from './services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from './services/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EnterkeyComponent } from './components/enterkey/enterkey.component';
import { BarchartComponent } from './components/barchart/barchart.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'enterkey', component: EnterkeyComponent},
  {path: 'barchart', component: BarchartComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EnterkeyComponent,
    BarchartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
