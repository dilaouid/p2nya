import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chatroom-callbox',
  templateUrl: './chatroom-callbox.component.html',
  styleUrls: ['./chatroom-callbox.component.css']
})
export class ChatroomCallboxComponent implements OnInit {

  @Input() inCall: any[] | undefined;
  @Input() userInCall: boolean | undefined;
  api: string;

  constructor() {
    this.api = environment.api;
  }

  ngOnInit(): void {
  }

}
