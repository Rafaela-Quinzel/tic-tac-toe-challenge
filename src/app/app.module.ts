import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'
//import { HomeModule } from './app/home/home.module';
import { MarvelService } from '../app/shared/service/marvel.service'
import { HttpClientModule } from '@angular/common/http';
import { HomePipe } from './home/home.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //HomeModule
  ],
  providers: [MarvelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
