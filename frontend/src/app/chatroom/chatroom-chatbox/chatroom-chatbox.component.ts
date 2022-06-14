import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chatroom-chatbox',
  templateUrl: './chatroom-chatbox.component.html',
  styleUrls: ['./chatroom-chatbox.component.css']
})
export class ChatroomChatboxComponent implements OnInit {

  stack: any[] = [];
  message: string = '';
  @Input() uuid!: string | null;


  constructor(private socket: Socket) { }

  ngOnInit(): void { }

  send() {
    // Need to store emojis :-°
    this.socket.emit('message', this.uuid, 'test');
  };

}
