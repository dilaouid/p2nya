import { Component, OnInit, Input  } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chatroom-navbar',
  templateUrl: './chatroom-navbar.component.html',
  styleUrls: ['./chatroom-navbar.component.css']
})
export class ChatroomNavbarComponent implements OnInit {

  api: string;

  @Input() users: any[] | undefined;

  constructor() {
    this.api = environment.api;
  }

  ngOnInit(): void {
  }

}
