import { Component, OnInit, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chatroom-chatbox',
  templateUrl: './chatroom-chatbox.component.html',
  styleUrls: ['./chatroom-chatbox.component.css']
})
export class ChatroomChatboxComponent implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit(): void { }

  socketTest() {
    this.socket.emit('test', "this is a test");
  }

}
