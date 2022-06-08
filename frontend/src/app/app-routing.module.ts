import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { ChatroomContentComponent } from './chatroom/chatroom-content/chatroom-content.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'room/:id', component: ChatroomContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
