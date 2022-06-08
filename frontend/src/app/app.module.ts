import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBtnComponent } from './home/home-btn/home-btn.component';
import { HomeHeadingComponent } from './home/home-heading/home-heading.component';
import { HomeBtnContainerComponent } from './home/home-btn-container/home-btn-container.component';
import { HomeModalCreateComponent } from './home/home-modal-create/home-modal-create.component';
import { HomeModalJoinComponent } from './home/home-modal-join/home-modal-join.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { ChatroomNavbarComponent } from './chatroom/chatroom-navbar/chatroom-navbar.component';
import { ChatroomContentComponent } from './chatroom/chatroom-content/chatroom-content.component';
import { ChatroomCallboxComponent } from './chatroom/chatroom-callbox/chatroom-callbox.component';
import { ChatroomActivityboxComponent } from './chatroom/chatroom-activitybox/chatroom-activitybox.component';
import { ChatroomChatboxComponent } from './chatroom/chatroom-chatbox/chatroom-chatbox.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeBtnComponent,
    HomeHeadingComponent,
    HomeBtnContainerComponent,
    HomeModalCreateComponent,
    HomeModalJoinComponent,
    HomepageComponent,
    ChatroomNavbarComponent,
    ChatroomContentComponent,
    ChatroomCallboxComponent,
    ChatroomActivityboxComponent,
    ChatroomChatboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
