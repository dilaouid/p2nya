import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';

interface UserInformation {
  uuid: string;
  username: string;
};

interface MessageStack {
  date: string;
  content: string;
  picture: boolean;
};

interface MessagesHistory {
  author: UserInformation;
  history: MessageStack[];
};

@Component({
  selector: 'app-chatroom-chatbox',
  templateUrl: './chatroom-chatbox.component.html',
  styleUrls: ['./chatroom-chatbox.component.css']
})
export class ChatroomChatboxComponent implements OnInit {

  stack: any[] = [];
  message: string = '';
  history: MessagesHistory[] = [];
  @Input() uuid!: string | null;
  @Input() users!: any;
  @ViewChild('input') inp!: ElementRef;

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    console.log(this.users);
    this.socket.on('message-sent', (content: string, author: string) => {
        console.log(content);
    });
  };

  writeMessage(event: any): void {
    this.message = event.target.innerHTML?.trim();
  };

  send() {
    // Need to store emojis :-°
    this.socket.emit('message', this.uuid, this.message.replace('<div><br></div>', ''));
    this.inp.nativeElement.innerText = '';
    this.message = '';
  };

}
