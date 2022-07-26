import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { JoinRoom } from 'src/app/API/Rooms';

@Component({
  selector: 'app-chatroom-password',
  templateUrl: './chatroom-password.component.html',
  styleUrls: ['./chatroom-password.component.css']
})
export class ChatroomPasswordComponent implements OnInit {

  @Input() uuid: string;
  @Input() passwordRequired: boolean;
  @Input() GetRoom: any;
  
  printAlert: boolean = false;
  password: string = '';
  loading: boolean = false;

  constructor(private router: Router, private socket: Socket) {
    this.uuid = '';
    this.passwordRequired = true;
  }

  setPassword(event: any) {
    let input = event.target.value;
    this.password = input?.trim();
  };

  submitPassword() {
    if (this.loading) return;
    else {
      this.loading = true;
      JoinRoom(this.uuid, this.password).then(d => {
        this.GetRoom(true);
        this.passwordRequired = false;
      }).catch(e => {
        this.loading = false;
        this.printAlert = true;
      });
    }
  }

  ngOnInit(): void {
  }

}
