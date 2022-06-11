import { Component, OnInit, Input  } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Me {
  id: number;
  uuid: string;
  username: string;
};

@Component({
  selector: 'app-chatroom-navbar',
  templateUrl: './chatroom-navbar.component.html',
  styleUrls: ['./chatroom-navbar.component.css']
})
export class ChatroomNavbarComponent implements OnInit {

  api: string;

  @Input() users: any[] | undefined;
  @Input() username: string | undefined;
  @Input() me: Me | undefined;

  constructor() {
    this.api = environment.api;
  }

  ngOnInit(): void {
  }

  resetUsername() {
    this.username = this.me?.username;
  }

}
