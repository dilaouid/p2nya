import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBtnComponent } from './home/home-btn/home-btn.component';
import { HomeHeadingComponent } from './home/home-heading/home-heading.component';
import { HomeBtnContainerComponent } from './home/home-btn-container/home-btn-container.component';
import { HomeModalCreateComponent } from './home/home-modal-create/home-modal-create.component';
import { HomeModalJoinComponent } from './home/home-modal-join/home-modal-join.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeBtnComponent,
    HomeHeadingComponent,
    HomeBtnContainerComponent,
    HomeModalCreateComponent,
    HomeModalJoinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
