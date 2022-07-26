import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';
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
import { ChatroomModalEditProfileComponent } from './chatroom/chatroom-modal-edit-profile/chatroom-modal-edit-profile.component';
import { ChatroomModalNotYetComponent } from './chatroom/chatroom-modal-not-yet/chatroom-modal-not-yet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChatroomModalEmojisComponent } from './chatroom/chatroom-modal-emojis/chatroom-modal-emojis.component';
import { ChatroomPasswordComponent } from './chatroom/chatroom-password/chatroom-password.component';

const config: SocketIoConfig = { url: environment.ws, options: {withCredentials: true} };
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
    ChatroomChatboxComponent,
    ChatroomModalEditProfileComponent,
    ChatroomModalNotYetComponent,
    ChatroomModalEmojisComponent,
    ChatroomPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
