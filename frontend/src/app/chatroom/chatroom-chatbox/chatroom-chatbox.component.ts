import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { updateProfilPictureLive } from 'src/app/utils/helpers';
import { environment } from 'src/environments/environment';

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
  stack: MessageStack[];
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
  @ViewChildren('profilPicture') profilPicture!: QueryList<ElementRef>;
  api: string = environment.api;

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.on('message-sent', (content: string, author: string) => {
        console.log(content);
    });

    this.socket.on('picture-updated', (uuid: string) => {
      updateProfilPictureLive(uuid, this.profilPicture);
    });

  };

  writeMessage(event: any): void {
    this.message = event.target.innerText?.trim();
  };

  send() {
    this.message = this.message?.trim();
    if (this.message.length === 0) return;
    
    // Need to store emojis :-°
    this.socket.emit('message', this.uuid, this.message);
    this.inp.nativeElement.innerText = '';
    this.message = '';
  };

}
