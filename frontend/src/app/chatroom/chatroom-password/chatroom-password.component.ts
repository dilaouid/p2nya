import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chatroom-password',
  templateUrl: './chatroom-password.component.html',
  styleUrls: ['./chatroom-password.component.css']
})
export class ChatroomPasswordComponent implements OnInit {

  @Input() uuid: string;
  @Input() passwordRequired: boolean;
  
  printAlert: boolean = false;
  password: string = '';

  constructor() {
    this.uuid = '';
    this.passwordRequired = true;
  }

  setPassword(event: any) {
    let input = event.target.value;
    this.password = input?.trim();
  };

  ngOnInit(): void {
  }

}
