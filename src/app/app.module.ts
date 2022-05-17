import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBtnComponent } from './home/home-btn/home-btn.component';
import { HomeHeadingComponent } from './home/home-heading/home-heading.component';
import { HomeBtnContainerComponent } from './home/home-btn-container/home-btn-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeBtnComponent,
    HomeHeadingComponent,
    HomeBtnContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
